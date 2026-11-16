import React from 'react';
import {AbsoluteFill,useCurrentFrame,interpolate} from 'remotion';
import type {SceneProps} from 'agentcut';
export default function CutFlash({clip,height,top=0.365,strength=0.48}:SceneProps & {top:number;strength:number}){
 const f=useCurrentFrame(); const alpha=interpolate(f,[0,3,clip.duration-1],[0,strength,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{top:height*top,height:height*(1-top),backgroundColor:'white',opacity:alpha,pointerEvents:'none'}}/>;
}
