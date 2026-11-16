import { AbsoluteFill } from "remotion";
import type { SceneProps } from "agentcut";
type Props = SceneProps & { bottomStrength?: number; topStrength?: number };
export default function Readability({ width, height, bottomStrength = 0.78, topStrength = 0.40 }: Props) {
  if (height > width) return null;
  return <AbsoluteFill style={{ pointerEvents: "none", background: `linear-gradient(180deg, rgba(0,0,0,${topStrength}) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 62%, rgba(0,0,0,${bottomStrength}) 100%)` }} />;
}
