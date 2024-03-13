import HoverElements from "./HoverElements";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import envMapHDRI from "../assets/hdri/meadow_2k.hdr";

const PointerEffects = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.5} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      <Environment files={envMapHDRI} background></Environment>
      <ambientLight />
      <directionalLight castShadow position={[0, 7, 6]} intensity={1} shadow-mapSize={1024}></directionalLight>
      <HoverElements />
    </>
  );
};

export default PointerEffects;
