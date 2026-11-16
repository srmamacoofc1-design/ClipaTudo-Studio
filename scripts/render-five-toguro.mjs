/**
 * Five separate 35-second native Agentcut / Remotion projects based on the actual Toguro
 * reference; preserves the user's original project and original audio. NO freeze frames.
 * Run: node --import tsx scripts/render-five-toguro.mjs toguro-055
 */
import {readFileSync,writeFileSync,mkdirSync,existsSync,rmSync,cpSync,copyFileSync} from "node:fs";
import {join,resolve} from "node:path";
import {spawnSync} from "node:child_process";
import {scaffoldWorkspace} from "../packages/agentcut/src/studio/workspace.ts";
import {readProjectState} from "../packages/agentcut/src/studio/projects.ts";
import {buildRenderEntrySource} from "../packages/agentcut/src/studio/bundler.ts";
import {runLocalRender} from "../packages/agentcut/src/studio/render.ts";
const id=process.argv[2];
const EDITS={
 "toguro-055":{title1:"TOGURO REVELA",title2:"CONTRATOS PERDIDOS",start:0,seconds:35},
 "toguro-034":{title1:"DESAFIO DAS CLARAS",title2:"A REAÇÃO SURPREENDE",start:11,seconds:35},
 "toguro-044":{title1:"TOGURO CONFUNDIU",title2:"A OFERTA COM FLERTE",start:6,seconds:35},
 "toguro-024":{title1:"TOGURO DESAFIA",title2:"QUEM CRITICA O SHAPE",start:5,seconds:35},
 "toguro-066":{title1:"MILHÕES DE SEGUIDORES",title2:"NÃO IMPRESSIONAM?",start:2,seconds:35},
};
const edit=EDITS[id];
if(!edit)throw Error("Unknown edit "+id);
const FPS=30,FRAMES=1050,slug=id+"-35s-001";
const workspace=resolve("workspace");
const outDir=resolve("artifacts");
mkdirSync(outDir,{recursive:true});
const originalDir=join(workspace,"projects","toguro");
const targetDir=join(workspace,"projects",slug);
const status={id,source:"real-public-raw",style:"Toguro",isNewEdit:true,status:"PREPARING",approvedByOwner:false};
const writeStatus=()=>writeFileSync(join(outDir,id+"-status.json"),JSON.stringify(status,null,2)+"\n");
writeStatus();
function spawn(cmd,args){const r=spawnSync(cmd,args,{encoding:"utf8",maxBuffer:10_000_000});if(r.status!==0)throw Error(cmd+": "+r.stderr?.slice(-2000));return r.stdout;}
function clamp(x,lo,hi){return Math.min(hi,Math.max(lo,x));}
function norm(s){return s.replace(/[“”"–—]/g,"").trim();}
try{
 if(!existsSync(join(originalDir,"project.json")))throw Error("Missing reference Toguro project ZIP");
 const catalog=JSON.parse(readFileSync("clipatudo/materiais-brutos/catalogo.json"));
 const source=catalog.materiais.find(x=>x.id===id);
 if(!source)throw Error("Missing catalog id");
 const raw=resolve("selection-work",source.arquivo);
 if(!existsSync(raw))throw Error("Missing downloaded raw "+raw);
 const transcript=JSON.parse(readFileSync(resolve("analysis-data",id+"-transcript.json")));
 const duration=Number(transcript.duration);
 let start=edit.start;
 if(start+35>duration)start=Math.max(0,duration-35.005);
 const end=start+35;
 if(end>duration+0.005)throw Error("Insufficient raw duration "+duration);
 rmSync(targetDir,{force:true,recursive:true});
 cpSync(originalDir,targetDir,{recursive:true});
 const assets=join(targetDir,"assets");
 const rawAsset="assets/video/"+id+"-raw.mp4";
 mkdirSync(join(assets,"video"),{recursive:true});
 copyFileSync(raw,join(targetDir,rawAsset));
 const project=JSON.parse(readFileSync(join(originalDir,"project.json")));
 project.name="Toguro · "+id+" · Edição de 35 segundos · Rodada 001";
 project.durationInFrames=FRAMES;
 writeFileSync(join(targetDir,"project.json"),JSON.stringify(project,null,2)+"\n");
 const layers=JSON.parse(readFileSync(join(originalDir,"layers.json")));
 // Follow real video, never a still.
 layers.tracks=layers.tracks.filter(t=>!["apoios-estaveis","fala"].includes(t.id));
 const frames=JSON.parse(readFileSync(resolve("analysis-data",id+"-face-track.json")));
 const srcW=Number(source.largura),srcH=Number(source.altura);
 const zoomWidth=srcW/srcH>=1.3?0.49357:0.82;
 // 35 continuous source seconds, cut into five native clips. Clip boundaries are
 // editorial camera emphasis changes, NOT a fake repeat or a frozen still.
 const cutSeconds=[0,4.4,10.7,17.8,25.5,35];
 const vids=[];
 const notes=[];
 for(let k=0;k<cutSeconds.length-1;k++){
  const from=Math.round(cutSeconds[k]*FPS);
  const to=Math.round(cutSeconds[k+1]*FPS);
  const a=start+from/FPS, b=start+to/FPS;
  const detections=frames.filter(q=>q.seconds>=a-0.15&&q.seconds<=b+0.15);
  const baseline=detections.filter(q=>q.confidence>=0.5).map(q=>q.centerX);
  const median=baseline.length?baseline.slice().sort((x,y)=>x-y)[Math.floor(baseline.length/2)]:0.5;
  const x0=clamp(median-zoomWidth/2,0,1-zoomWidth);
  const sceneZoom=(k===1||k===3)?0.93:1;
  const w=zoomWidth*sceneZoom;
  const path=[];
  let smooth=x0;
  for(const sample of detections){
   let target=sample.confidence>=0.5?clamp(sample.centerX-w/2,0,1-w):smooth;
   const delta=clamp(target-smooth,-0.035,0.035);
   smooth=clamp(smooth+delta*0.44,0,1-w);
   path.push({seconds:sample.seconds,crop:{x:smooth,y:0,width:w,height:1}});
  }
  if(path.length<2){
   path.push({seconds:a,crop:{x:x0,y:0,width:w,height:1}});
   path.push({seconds:b-.04,crop:{x:x0,y:0,width:w,height:1}});
  }
  // Source absolute time is preserved; Remotion evaluates the same path for export.
  vids.push({id:id+"-video-"+(k+1),name:"Tomada "+(k+1)+" · vídeo em movimento",
   src:rawAsset,from,duration:to-from,trimStart:Math.round(a*FPS),muted:false,volume:1,
   fit:"contain",box:{x:0,y:0.3586991733462844,width:1,height:0.641056335297767},
   variants:{mobile:{framing:{crop:path[0].crop,path}}},
   note:"Fonte original e áudio real; sem frame congelado. Detecção de rosto é experimental, revisão estética pendente."});
  notes.push({sourceStart:a,sourceEnd:b,outputStart:from/FPS,outputEnd:to/FPS,facesFound:baseline.length,zoom:sceneZoom});
 }
 const videoTrack=layers.tracks.find(x=>x.id==="video");
 videoTrack.clips=vids;
 // Editable word-by-word yellow captions, single truth from time-stamped transcript.
 const phrases=transcript.segments||[];
 const words=phrases.flatMap(s=>s.words||[])
   .filter(w=>typeof w.start==="number"&&typeof w.end==="number"&&w.end>w.start
     &&w.start>=start&&w.start<end&&w.probability>=0.25);
 const captionTrack=layers.tracks.find(x=>x.id==="legendas");
 captionTrack.clips=words.map((w,index)=>{
   const f=clamp(Math.round((w.start-start)*FPS),0,FRAMES-1);
   const dur=clamp(Math.round((Math.min(end,w.end)-w.start)*FPS),1,Math.max(1,FRAMES-f));
   return {id:id+"-legenda-"+index,name:norm(w.word).toUpperCase(),
       scene:"StyledText",from:f,duration:dur,
       props:{text:norm(w.word).toUpperCase(),y:0.78,size:80,color:"#f0ff00",
          font:"ClipaLegenda",stroke:4,pop:true}};
 }).filter(c=>c.name.length>0);
 for(const track of layers.tracks){
  if(["banner","seta","arte"].includes(track.id)){
   for(const c of track.clips){c.from=0;c.duration=FRAMES;}
  }
  if(track.id==="titulos"){
   track.clips[0].props.text=edit.title1;
   track.clips[1].props.text=edit.title2;
   for(const c of track.clips){c.from=0;c.duration=FRAMES;}
  }
  if(track.id==="transicao"){
   const orig=track.clips[0];
   track.clips=[{...orig,id:id+"-flash-1",from:321,duration:7},
    {...orig,id:id+"-flash-2",from:765,duration:7}];
  }
  if(track.id==="musica"){
   const music=track.clips[0];
   const originalMusic=join(originalDir,music.src);
   const musicOut=join(assets,"music",id+"-loop35.wav");
   mkdirSync(join(assets,"music"),{recursive:true});
   // Loop only the style's user-provided sample; keep source music independent.
   spawn("ffmpeg",["-hide_banner","-loglevel","error","-y","-stream_loop","-1",
    "-i",originalMusic,"-t","35","-af","afade=t=in:st=0:d=1,afade=t=out:st=34:d=1",
    "-c:a","pcm_s16le",musicOut]);
   music.src="assets/music/"+id+"-loop35.wav";
   music.from=0;music.duration=FRAMES;music.volume=0.10;music.fadeIn=15;music.fadeOut=15;
  }
  if(track.id==="sfx"){
    // Short sound emphasis sampled from user-provided original asset; volume modest.
    const fx=track.clips[0];
    track.clips=[{...fx,id:id+"-sfx",from:320,duration:Math.min(35,fx.duration),volume:0.11}];
  }
 }
 writeFileSync(join(targetDir,"layers.json"),JSON.stringify(layers,null,2)+"\n");
 const plan={id,sourceFilename:source.arquivo,sourceHash:source.sha256,title1:edit.title1,title2:edit.title2,
    sourceStart:start,sourceEnd:end,outputSeconds:35,outputFPS:FPS,
    frames:FRAMES,captionCount:captionTrack.clips.length,shots:notes,
    style:"Toguro v2 native: banner, titles, per-word yellow captions y=.78, arrow, art, separate music/SFX",
    warning:"Captions are automated transcription and need human listening verification; QA aesthetic pending."};
 writeFileSync(join(outDir,id+"-edit-plan.json"),JSON.stringify(plan,null,2)+"\n");
 const {paths}=scaffoldWorkspace(workspace);
 const state=readProjectState(paths,slug);
 status.validationIssues=state.issues;
 if(state.issues.some(i=>i.severity==="error"))throw Error("Project invalid "+JSON.stringify(state.issues).slice(0,2500));
 const entry=join(paths.render,slug+"-entry.tsx");
 writeFileSync(entry,buildRenderEntrySource(paths,slug,state.scenes));
 status.status="RENDERING";writeStatus();
 const output=await runLocalRender({paths,slug,variant:"mobile",entryPath:entry,port:32118,masterGain:1,
   resolution:"720p",project:state.project,layers:state.layers,
   onProgress:({stage,progress,message})=>{
    if(stage==="done"||stage==="error"||stage==="preparing")console.log(stage,progress??"",message??"");
   }});
 const mp4=join(outDir,id+"-Toguro-35s.mp4");
 copyFileSync(output.absolutePath,mp4);
 copyFileSync(join(targetDir,"project.json"),join(outDir,id+"-project.json"));
 copyFileSync(join(targetDir,"layers.json"),join(outDir,id+"-layers.json"));
 const ffprobe=spawn("ffprobe",["-v","error","-show_entries","format=duration:stream=codec_type,codec_name,width,height",
   "-of","json",mp4]);
 writeFileSync(join(outDir,id+"-ffprobe.json"),ffprobe);
 spawn("ffmpeg",["-hide_banner","-loglevel","error","-i",mp4,"-f","null","-"]);
 status.status="RENDERED_UNREVIEWED";status.output=mp4;status.captionCount=captionTrack.clips.length;
 status.duration=JSON.parse(ffprobe).format?.duration;status.approvedByOwner=false;
 writeStatus();
 console.log("SUCCESS FIVE-VIDEO EDIT",id,JSON.stringify(status));
}catch(error){status.status="FAILED";status.error=String(error?.stack??error);writeStatus();console.error(status.error);process.exitCode=1;}
