import FadingImage from "./FadingImage";
import PhysicsElements from "./PhysicsElements";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";

const Experience = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.5} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      <Environment files={"./assets/hdri/meadow_2k.hdr"} background></Environment>
      <ambientLight />
      <directionalLight castShadow position={[0, 7, 6]} intensity={1} shadow-mapSize={1024}></directionalLight>
      <FadingImage></FadingImage>
      <PhysicsElements></PhysicsElements>
    </>
  );
};

export default Experience;
