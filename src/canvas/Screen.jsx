import { RenderTexture } from "@react-three/drei";
import useAppStore from "../store";

const Screen = ({ data, portalSize }) => {
  const experience = useAppStore(state => state.currentExperience);

  return (
    <>
      {experience === data.name && (
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[portalSize.width, portalSize.height]} />
          <meshBasicMaterial>
            <RenderTexture attach={"map"}>{data.experience}</RenderTexture>
          </meshBasicMaterial>
        </mesh>
      )}
    </>
  );
};

export default Screen;
