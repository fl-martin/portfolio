import { RenderTexture } from "@react-three/drei";
import useAppStore from "../store";
import Experience from "./Experience";

const Screen = ({ experienceName, portalSize }) => {
  const experience = useAppStore(state => state.currentExperience);

  return (
    <>
      <mesh position={[0, 0, -9]} visible={experience === experienceName}>
        <planeGeometry args={[portalSize.width, portalSize.height]} />
        <meshStandardMaterial>
          <RenderTexture attach='map'>
            <Experience />
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
    </>
  );
};

export default Screen;
