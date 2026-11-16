import type { StudioToolContext } from "./agent-tools";
import type { Box, FramingKeyframe, StudioDoc, VideoClip } from "./types";
import {
  framingSampleTimes,
  followSampleTimes,
  followFaceCrop,
  stableFaceCrop,
  updateFraming,
} from "./framing";
import { studioFileUrl } from "./file-url";
import { detectSourceFaces } from "./face-detection";

export async function runFaceFraming(
  params: Record<string, unknown>,
  doc: StudioDoc,
  context: StudioToolContext,
  detect = detectSourceFaces,
) {
  if (!doc.project || !doc.layers)
    throw new Error("Open a valid project first.");
  const follow = params.mode !== "static";
  const region = params.region as Box | undefined;
  const zoom = params.zoom as { from: number; to: number } | undefined;
  if (
    zoom &&
    (![zoom.from, zoom.to].every(
      (v) => Number.isFinite(v) && v >= 1 && v <= 3,
    ) ||
      Math.max(zoom.from, zoom.to) / Math.min(zoom.from, zoom.to) > 1.25)
  )
    throw new Error(
      "zoom endpoints must be 1–3, with at most a 25% change per shot.",
    );
  if (zoom && !follow) throw new Error("zoom requires mode=follow.");
  if (
    region &&
    (![region.x, region.y, region.width, region.height].every(
      Number.isFinite,
    ) ||
      region.x < 0 ||
      region.y < 0 ||
      region.width <= 0 ||
      region.height <= 0 ||
      region.x + region.width > 1 ||
      region.y + region.height > 1)
  )
    throw new Error("region must be a bounded normalized source rectangle.");
  if (
    params.mode !== undefined &&
    params.mode !== "static" &&
    params.mode !== "follow"
  )
    throw new Error("mode must be follow or static.");
  const variant =
    typeof params.variant === "string" ? params.variant : context.getVariant();
  const size = doc.project.variants[variant];
  if (!size)
    return {
      status: "invalid_variant",
      next: "Choose a project variant.",
      variants: Object.keys(doc.project.variants),
    };
  if (
    params.action !== undefined &&
    params.action !== "center" &&
    params.action !== "reset"
  )
    throw new Error("action must be center or reset.");
  if (
    params.clipIds !== undefined &&
    (!Array.isArray(params.clipIds) ||
      !params.clipIds.length ||
      params.clipIds.length > 8 ||
      params.clipIds.some((id) => typeof id !== "string"))
  )
    throw new Error("clipIds must contain 1–8 clip IDs.");
  const candidates = doc.layers.tracks
    .filter((t) => t.kind === "video" && !t.hidden && !t.locked)
    .flatMap((t) => t.clips);
  const selection = context.getSelection();
  const ids = [
    ...new Set(
      (params.clipIds as string[] | undefined) ??
        (selection.length
          ? selection
          : candidates.length === 1
            ? [candidates[0].id]
            : []),
    ),
  ];
  if (!ids.length)
    return {
      status: "selection_required",
      next: "Select the talking-head video clip or pass clipIds. No clip was changed.",
      candidates: candidates.map((c) => ({ id: c.id, name: c.name })),
    };
  const clips: VideoClip[] = [];
  for (const id of ids) {
    const track = doc.layers.tracks.find((t) =>
      t.clips.some((c) => c.id === id),
    );
    if (!track || track.kind !== "video" || track.hidden || track.locked)
      return {
        status: "unsupported_selection",
        clipId: id,
        next: "Choose visible video clips on unlocked tracks. Scenes and nested camera overlays are not supported.",
      };
    const clip = (track.clips as VideoClip[]).find((c) => c.id === id)!;
    clips.push({ ...clip, ...clip.variants?.[variant], id });
  }
  let attemptedSave = false;
  try {
    if (params.action === "reset") {
      const changed = clips.filter((c) => {
        const original = doc
          .layers!.tracks.flatMap((t) =>
            t.kind === "video" ? (t.clips as VideoClip[]) : [],
          )
          .find((base) => base.id === c.id);
        return (
          original?.variants?.[variant]?.framing &&
          "before" in original.variants[variant].framing!
        );
      });
      if (!changed.length)
        return {
          status: "unchanged",
          next: "These clips have no tool crop to reset in this variant.",
        };
      attemptedSave = true;
      await context.applyToolLayers(
        updateFraming(
          doc.layers,
          variant,
          null,
          changed.map((c) => c.id),
        ),
        doc,
      );
      return {
        status: "reset",
        project: doc.slug,
        variant,
        clipIds: changed.map((c) => c.id),
        undo: "Use the studio Undo command to restore this crop.",
      };
    }
    const crops = new Map<string, Box>();
    const paths = new Map<string, FramingKeyframe[]>();
    const sampleTimes = clips.map((clip) =>
      follow
        ? followSampleTimes(clip, doc.project!.fps)
        : framingSampleTimes(clip, doc.project!.fps),
    );
    if (
      sampleTimes.some((times) => !times) ||
      sampleTimes.reduce((sum, times) => sum + (times?.length ?? 0), 0) > 1800
    )
      return {
        status: "range_too_long",
        applied: false,
        next: "Follow supports up to 10 minutes of source time per clip and 1,800 samples per call. Split longer shots or process fewer clips. No partial path was applied.",
      };
    const results = [];
    for (const [index, clip] of clips.entries()) {
      if (/^(https?:|data:|blob:)/i.test(clip.src) || clip.cursor)
        return {
          status: "unsupported_source",
          clipId: clip.id,
          next: "Use an original project or library video without a cursor overlay. Import remote footage into the project first.",
        };
      if (
        !/^(assets\/|library:)/.test(clip.src) ||
        /(^|\/)\.\.(\/|$)/.test(clip.src)
      )
        return {
          status: "invalid_source",
          clipId: clip.id,
          next: "Use an assets/ or library: source path.",
        };
      const source = await detect(
        studioFileUrl(doc.slug, clip.src),
        sampleTimes[index]!,
        region,
      );
      const box = clip.box ?? { width: 1, height: 1 };
      const aspect = (size.width * box.width) / (size.height * box.height);
      const motion = follow
        ? followFaceCrop(source.samples, source, aspect, zoom)
        : null;
      const result = motion ?? stableFaceCrop(source.samples, source, aspect);
      if (params.inspectOnly === true) {
        results.push({ clipId: clip.id, source, result });
        continue;
      }
      if (result.status !== "ready")
        return { ...result, clipId: clip.id, applied: false };
      crops.set(clip.id, result.crop);
      if (motion?.status === "ready") paths.set(clip.id, motion.path);
      results.push({
        clipId: clip.id,
        sourceSize: { width: source.width, height: source.height },
        ...result,
        path: undefined,
        keyframes: paths.get(clip.id)?.length,
      });
    }
    if (params.inspectOnly === true)
      return { status: "inspected", applied: false, clips: results };
    if (context.getDoc()?.projectHash !== doc.projectHash)
      return {
        status: "stale_project",
        applied: false,
        next: "Project settings changed during detection. Retry with the current format.",
      };
    attemptedSave = true;
    await context.applyToolLayers(
      updateFraming(doc.layers, variant, crops, ids, paths),
      doc,
    );
    return {
      status: "applied",
      project: doc.slug,
      variant,
      clips: results,
      local: true,
      tracking: follow,
      note: follow
        ? "Short shots sampled at 0.1-second source intervals, up to 0.5 seconds for long shots. Smoothed local face path with a dead zone, brief loss hold and optional eased zoom. Search region limits detection, not the output. No identity recognition; review between samples."
        : "A fixed crop was requested.",
      undo: "Use Undo, or call agentcut_frame_person with action=reset and the same clipIds/variant.",
    };
  } catch (error) {
    return {
      status: "error",
      applied: attemptedSave ? "unconfirmed" : false,
      message: error instanceof Error ? error.message : String(error),
      next: "Check the source, helper version and local vision resources. Inspect the timeline after a save error; do not guess a crop.",
    };
  }
}
