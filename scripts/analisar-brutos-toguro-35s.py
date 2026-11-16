#!/usr/bin/env python3
"""Analyze TWO already-published Toguro raw clips. No modifications to either."""
import json, subprocess, os, sys, traceback
from pathlib import Path
ROOT=Path("selection-work")
OUT=Path("artifacts")
OUT.mkdir(exist_ok=True)
ITEMS=[
("toguro-055","04_Banco_01-10_ele_conta_que_perdeu_dois_contratos_milionarios_e_o_visto.mp4"),
("toguro-034","03_Selecao_94_V29_ele_jurou_que_era_so_clara_veja_a_reacao_de_quem_topou.mp4"),
]
def run(args):
    return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
meta=[]
for id,fn in ITEMS:
    video=ROOT/fn
    info=json.loads(run(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(video)]).stdout)
    (OUT/f"{id}-ffprobe.json").write_text(json.dumps(info,indent=2))
    duration=float(info["format"]["duration"])
    meta.append({"id":id,"name":fn,"duration":duration,"streams":[{k:s.get(k) for k in ("codec_type","codec_name","width","height","sample_rate")} for s in info["streams"]]})
    run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(video),
         "-vf","fps=1/4,scale=320:-2,tile=4x3:padding=3:margin=3:color=black",
         "-frames:v","1",str(OUT/f"{id}-contact.jpg")])
    run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(video),
         "-t","45","-vf","scale=480:-2","-c:v","libx264","-preset","veryfast","-crf","31",
         "-c:a","aac","-b:a","64k","-movflags","+faststart",
         str(OUT/f"{id}-proxy.mp4")])
    run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(video),
         "-vn","-ac","1","-ar","16000","-c:a","pcm_s16le",str(ROOT/f"{id}.wav")])
(OUT/"selection.json").write_text(json.dumps(meta,indent=2,ensure_ascii=False))
try:
    # Compatibility patch: recent PyAV builds reject the optional metadata_errors kwarg
    # used by faster-whisper's audio loader. FFmpeg has already decoded the WAV.
    import av
    _av_open = av.open
    def _compatible_av_open(*args, **kwargs):
        kwargs.pop("metadata_errors", None)
        return _av_open(*args, **kwargs)
    av.open = _compatible_av_open
    from faster_whisper import WhisperModel
    model=WhisperModel("base",device="cpu",compute_type="int8",cpu_threads=4)
    for id,fn in ITEMS:
        segs,inf=model.transcribe(str(ROOT/f"{id}.wav"),language="pt",beam_size=5,word_timestamps=True,vad_filter=True,condition_on_previous_text=False)
        segments=[]
        for s in segs:
            segments.append({"start":s.start,"end":s.end,"text":s.text.strip(),
                "words":[{"start":w.start,"end":w.end,"word":w.word.strip(),"probability":w.probability} for w in (s.words or [])]})
        data={"id":id,"duration":next(x["duration"] for x in meta if x["id"]==id),
              "language":inf.language,"language_probability":inf.language_probability,"segments":segments}
        (OUT/f"{id}-transcript.json").write_text(json.dumps(data,indent=2,ensure_ascii=False))
        (OUT/f"{id}-transcript.txt").write_text("\n".join(f"{s['start']:05.2f}-{s['end']:05.2f} {s['text']}" for s in segments))
        print(f"TRANSCRIBED {id}: {len(segments)} segments")
except Exception as e:
    (OUT/"transcription-error.txt").write_text(traceback.format_exc())
    print(f"WARNING: TRANSCRIPTION FAILED {e}",file=sys.stderr)
