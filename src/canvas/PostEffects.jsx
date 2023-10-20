import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";

const PostEffects = () => {
  return (
    <EffectComposer>
      <ChromaticAberration
        offset={[0.001, 0.001]} // color offset
      />
      <Bloom
        intensity={1.0} // The bloom intensity.
        luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.5} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={false} // Enables or disables mipmap blur.
      />
    </EffectComposer>
  );
};

export default PostEffects;
