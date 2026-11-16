/**
 * Smoke test da timeline nativa Toguro, em ambiente isolado do GitHub Actions.
 * Não modifica o projeto original e NÃO cria edição de um vídeo novo.
 */
import { existsSync, mkdirSync, cpSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { scaffoldWorkspace } from "../packages/agentcut/src/studio/workspace.ts";
import { readProjectState, projectDir } from "../packages/agentcut/src/studio/projects.ts";
import { buildRenderEntrySource } from "../packages/agentcut/src/studio/bundler.ts";
import { runLocalRender } from "../packages/agentcut/src/studio/render.ts";

const base = resolve("workspace");
const original = join(base, "projects", "toguro");
const slug = "toguro-teste-001";
const testProject = join(base, "projects", slug);
const artifactDir = resolve("artifacts");
mkdirSync(artifactDir, { recursive: true });
const statusPath = join(artifactDir, "status.json");
const status = {
  project: "toguro",
  trialProject: slug,
  source: "release ClipaTudo-Projeto-Toguro.zip",
  isNewFootageEdit: false,
  branch: process.env.GITHUB_REF_NAME ?? "local",
  status: "NOT_RUN",
  output: null,
  notes: "A renderização da timeline original é um teste técnico, não aprovação estética."
};
function save() { writeFileSync(statusPath, JSON.stringify(status, null, 2)+"\n"); }
save();
try {
  if (!existsSync(join(original, "project.json")) || !existsSync(join(original,"layers.json"))) {
    throw new Error("Faltam project.json ou layers.json do projeto Toguro extraído.");
  }
  // Cópia isolada: nunca reescreva o original da Release.
  rmSync(testProject, { recursive: true, force: true });
  cpSync(original, testProject, { recursive: true });
  const { paths } = scaffoldWorkspace(base);
  const state = readProjectState(paths,slug);
  const severe = state.issues.filter((issue)=>issue.severity==="error");
  status.validation = { totalIssues: state.issues.length, errors: severe.length, scenes: state.scenes };
  if (!state.project || !state.layers || severe.length) {
    throw new Error("Timeline inválida: "+JSON.stringify(severe).slice(0,2400));
  }
  const entryPath = join(paths.render, "preview-toguro.entry.tsx");
  writeFileSync(entryPath, buildRenderEntrySource(paths,slug,state.scenes));
  console.log("Project:",slug,"frames:",state.project.durationInFrames,
    "fps:",state.project.fps,"scenes:",state.scenes.join(", "));
  status.status = "RENDERING";
  save();
  const result = await runLocalRender({
    paths,
    slug,
    variant: "mobile",
    entryPath,
    port: 32118,
    masterGain: 1,
    resolution: "720p",
    project: state.project,
    layers: state.layers,
    onProgress: ({stage,progress,message}) => console.log(String(stage), progress ?? "", message ?? "")
  });
  const target = join(artifactDir,"Toguro-previa-original-720p.mp4");
  copyFileSync(result.absolutePath,target);
  status.output = "Toguro-previa-original-720p.mp4";
  status.status = "RENDERED_UNREVIEWED";
  status.renderDurationMs = result.renderDurationMs;
  save();
  console.log("RENDER_OUTPUT",target);
} catch(error) {
  status.status="FAILED";
  status.error=String(error?.stack ?? error);
  save();
  console.error("RENDER_FAIL",status.error);
  process.exitCode=1;
}
