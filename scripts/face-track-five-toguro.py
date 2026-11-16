#!/usr/bin/env python3
"""Source-time face-center sampling for native Agentcut crop paths.
No frames are frozen, synthesized or substituted. Missing detections are explicit.
"""
import cv2, json, sys, pathlib
file=pathlib.Path(sys.argv[1])
output=pathlib.Path(sys.argv[2])
cap=cv2.VideoCapture(str(file))
if not cap.isOpened(): raise RuntimeError("Cannot decode source "+str(file))
fps=cap.get(cv2.CAP_PROP_FPS)
count=cap.get(cv2.CAP_PROP_FRAME_COUNT)
if fps<=0:raise RuntimeError("Invalid video FPS")
duration=count/fps
frontal=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
profile=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_profileface.xml")
lastx=0.50
samples=[]
for step in range(int(duration/.30)+1):
    at=min(duration-.01, step*.30)
    cap.set(cv2.CAP_PROP_POS_MSEC, at*1000)
    ok,img=cap.read()
    if not ok:continue
    height,width=img.shape[:2]
    scale= min(1,640/width)
    small=cv2.resize(img,(int(width*scale),int(height*scale)))
    gray=cv2.cvtColor(small,cv2.COLOR_BGR2GRAY)
    faces=list(frontal.detectMultiScale(gray,scaleFactor=1.12,minNeighbors=4,minSize=(25,25)))
    if not faces:faces=list(profile.detectMultiScale(gray,scaleFactor=1.14,minNeighbors=4,minSize=(25,25)))
    if faces:
        # Preserve continuous subject location where possible. For multiple faces
        # this is only a suggestion and must be visually inspected by the owner.
        best=min(faces,key=lambda b:abs((b[0]+b[2]/2)/small.shape[1]-lastx)*2 - b[2]*b[3]/(small.shape[0]*small.shape[1]))
        x,y,w,h=best
        lastx=(x+w/2)/small.shape[1]
        samples.append({"seconds":round(at,4),"centerX":round(lastx,5),"confidence":0.8})
    else:
        samples.append({"seconds":round(at,4),"centerX":round(lastx,5),"confidence":0})
cap.release()
output.parent.mkdir(parents=True,exist_ok=True)
output.write_text(json.dumps(samples,indent=2))
print("SAMPLED",len(samples),"FRAMES, detections",sum(s["confidence"]>0 for s in samples),"of",len(samples),"at",duration,"s")
