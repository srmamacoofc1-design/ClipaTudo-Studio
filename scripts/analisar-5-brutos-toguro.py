#!/usr/bin/env python3
"""Five source metadata+word transcripts; diagnostics only. All inputs are public raw clips."""
import json, subprocess, traceback, sys
from pathlib import Path
ROOT=Path("selection-work"); OUT=Path("artifacts");ROOT.mkdir(exist_ok=True);OUT.mkdir(exist_ok=True)
IDS=["toguro-055","toguro-034","toguro-044","toguro-024","toguro-066"]
catalog=json.loads(Path("clipatudo/materiais-brutos/catalogo.json").read_text())
items={x["id"]:x for x in catalog["materiais"]}
def run(args):return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
def main():
    import av
    origin=av.open
    def compatible_open(*args,**kwargs):
        kwargs.pop("metadata_errors",None)
        return origin(*args,**kwargs)
    av.open=compatible_open
    from faster_whisper import WhisperModel
    model=WhisperModel("small",device="cpu",compute_type="int8",cpu_threads=4)
    results=[]
    for id in IDS:
        item=items[id]
        video=ROOT/item["arquivo"]
        info=json.loads(run(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(video)]).stdout)
        (OUT/f"{id}-ffprobe.json").write_text(json.dumps(info,indent=2))
        duration=float(info["format"]["duration"])
        run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(video),
         "-vf","fps=1/3.5,scale=320:-2,tile=4x4:padding=3:margin=3:color=black",
         "-frames:v","1",str(OUT/f"{id}-contact.jpg")])
        run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(video),
         "-t","55","-vf","scale=480:-2","-c:v","libx264","-preset","ultrafast","-crf","32",
         "-c:a","aac","-b:a","64k","-movflags","+faststart",str(OUT/f"{id}-proxy.mp4")])
        # Decode WAV with FFmpeg to avoid error handling and sampling inconsistencies.
        wav=ROOT/(id+".wav")
        run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(video),"-vn","-ac","1","-ar","16000","-c:a","pcm_s16le",str(wav)])
        segments,inf=model.transcribe(str(wav),language="pt",beam_size=5,word_timestamps=True,vad_filter=True,condition_on_previous_text=False)
        records=[]
        for s in segments:
            records.append({"start":s.start,"end":s.end,"text":s.text.strip(),
            "words":[{"start":w.start,"end":w.end,"word":w.word.strip(),"probability":w.probability} for w in (s.words or [])]})
        (OUT/f"{id}-transcript.json").write_text(json.dumps({"id":id,"duration":duration,"language":inf.language,"language_probability":inf.language_probability,"segments":records},indent=2,ensure_ascii=False))
        (OUT/f"{id}-transcript.txt").write_text("\n".join(f"{s['start']:05.2f}-{s['end']:05.2f} {s['text']}" for s in records))
        results.append({"id":id,"filename":item["arquivo"],"duration":duration,"bytes":video.stat().st_size,"segments":len(records)})
        print("COMPLETE",id,len(records),flush=True)
    (OUT/"selection.json").write_text(json.dumps(results,indent=2,ensure_ascii=False))
if __name__=="__main__":
    try:main()
    except Exception:
        (OUT/"analysis-error.txt").write_text(traceback.format_exc())
        raise
