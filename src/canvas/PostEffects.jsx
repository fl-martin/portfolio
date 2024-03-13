import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import useAppStore from "../store";

const PostEffects = () => {
  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const screen = useAppStore(state => state.currentScreen);

  return (
    <>
      {(cameraPosition !== "experience" || screen !== "experience") && (
        <EffectComposer disableNormalPass>
          <ChromaticAberration
            offset={[0.001, 0.001]} // color offset
          />
          <Bloom
            intensity={1.0} // The bloom intensity.
            luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.4} // smoothness of the luminance threshold. Range is [0, 1]
            mipmapBlur={false} // Enables or disables mipmap blur.
          />
        </EffectComposer>
      )}
    </>
  );
};

export default PostEffects;
