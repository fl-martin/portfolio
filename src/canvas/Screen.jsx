import { RenderTexture } from "@react-three/drei";

const Screen = ({ data, portalSize }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[portalSize.width, portalSize.height]} />
      <meshBasicMaterial>
        <RenderTexture attach={"map"}>{data.experience}</RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
};

export default Screen;
