import { Environment } from "@react-three/drei";
import CameraHandler from "./CameraHandler";
import useAppStore from "../store";
import Ocean from "./Ocean";

const MainScene = () => {
  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const ratioScale = Math.min(1, Math.max(0.8, window.innerWidth / 1920));

  return (
    <>
      <ambientLight />
      <CameraHandler></CameraHandler>
      {(cameraPosition !== "experience" || screen === "menu" || screen === "contact" || screen === "welcome") && (
        <>
          <Environment files={"./assets/hdri/kloppenheim_02_puresky_2k.hdr"} background></Environment>
          <mesh rotation={[Math.PI * -0.5, 0, 0]} position={[0, -6, 0]} scale={ratioScale}>
            <ringGeometry args={[0, 32, 80]}></ringGeometry>
            <meshStandardMaterial emissive={"violet"} color={"black"} emissiveIntensity={2} toneMapped={false}></meshStandardMaterial>
            <Ocean></Ocean>
          </mesh>
        </>
      )}
    </>
  );
};

export default MainScene;
