import React from 'react';
import {AbsoluteFill,useCurrentFrame,interpolate} from 'remotion';
import type {SceneProps} from 'agentcut';
type Props=SceneProps & {text:string;y:number;size:number;color:string;font:string;stroke:number;pop?:boolean};
export default function StyledText({text,y,size,color,font,stroke,pop=false,width,height}:Props){
 const frame=useCurrentFrame(); const s=width/1080;
 const shadow=Array.from({length:24},(_,i)=>{const a=i*Math.PI/12;return `${Math.cos(a)*stroke*s}px ${Math.sin(a)*stroke*s}px 0 #000`;}).join(',');
 const scale=pop?interpolate(frame,[0,2,4],[0.88,1.05,1],{extrapolateRight:'clamp'}):1;
 return <AbsoluteFill style={{pointerEvents:'none'}}><div style={{position:'absolute',left:0,width:'100%',top:y*height,transform:`translateY(-50%) scale(${scale})`,textAlign:'center',fontFamily:font,fontWeight:400,fontSize:size*s,lineHeight:1,whiteSpace:'nowrap',color,textShadow:shadow}}>{text}</div></AbsoluteFill>;
}
