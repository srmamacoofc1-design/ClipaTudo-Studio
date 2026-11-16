import type { Box, FramingKeyframe } from "./types";
import { followFaceCrop, type FaceSample } from "./framing";

/** Re-express the visible part of an existing full-source video box, without restyling it. */
export function visibleComposition(box: Box) {
  const left = Math.max(0, box.x),
    top = Math.max(0, box.y);
  const right = Math.min(1, box.x + box.width),
    bottom = Math.min(1, box.y + box.height);
  if (right <= left || bottom <= top)
    throw new Error("The video box does not intersect the canvas.");
  return {
    box: { x: left, y: top, width: right - left, height: bottom - top },
    crop: {
      x: Math.max(0, (left - box.x) / box.width),
      y: Math.max(0, (top - box.y) / box.height),
      width: Math.min(1, (right - left) / box.width),
      height: Math.min(1, (bottom - top) / box.height),
    },
  };
}

/** Follow displacement from the original framing anchor; keep its scale and visible composition. */
export function followComposition(
  samples: FaceSample[],
  source: { width: number; height: number },
  crop: Box,
) {
  // Keep native subject continuity/scene/loss guards. Full-source aspect avoids imposing a new style crop.
  const checked = followFaceCrop(samples, source, source.width / source.height);
  if (checked.status !== "ready") return checked;
  const first = samples.flatMap((s) =>
    s.faces.filter((f) => f.score >= 0.7),
  )[0];
  const cx = first.x + first.width / 2,
    cy = first.y + first.height / 2;
  const bound = (v: number, span: number) => Math.max(0, Math.min(1 - span, v));
  const path: FramingKeyframe[] = [];
  for (const sample of samples) {
    const face = sample.faces.find((f) => f.score >= 0.7);
    const prior = path.at(-1);
    let current = prior ? { ...prior.crop } : { ...crop };
    if (face && prior) {
      const dt = sample.seconds - prior.seconds;
      const smooth = (old: number, target: number, span: number) => {
        const d = target - old,
          dead = span * 0.015;
        const desired = Math.abs(d) < dead ? old : target - Math.sign(d) * dead;
        return old + (desired - old) * (1 - Math.exp(-dt / 0.16));
      };
      current.x = bound(
        smooth(current.x, crop.x + face.x + face.width / 2 - cx, crop.width),
        crop.width,
      );
      current.y = bound(
        smooth(current.y, crop.y + face.y + face.height / 2 - cy, crop.height),
        crop.height,
      );
      // Constrain the lag only when a detected face would leave the visible crop.
      if (face.width <= crop.width)
        current.x = Math.max(
          Math.max(0, face.x + face.width - crop.width),
          Math.min(current.x, face.x),
        );
      if (face.height <= crop.height)
        current.y = Math.max(
          Math.max(0, face.y + face.height - crop.height),
          Math.min(current.y, face.y),
        );
    }
    path.push({ seconds: sample.seconds, crop: current });
  }
  return { ...checked, crop: path[0].crop, path };
}
