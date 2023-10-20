import { Bloom, ChromaticAberration, EffectComposer, Outline } from "@react-three/postprocessing";
import { forwardRef, useEffect } from "react";

const GlobalPostEffects = forwardRef((props, outlineRef) => {
  useEffect(() => console.log(outlineRef.current), []);

  return (
    <EffectComposer>
      <Outline xRay edgeStrength={2.5} pulseSpeed={0.0} visibleEdgeColor={0xffffff} hiddenEdgeColor={0x22090a} ref={outlineRef} />
    </EffectComposer>
  );
});

export default GlobalPostEffects;
