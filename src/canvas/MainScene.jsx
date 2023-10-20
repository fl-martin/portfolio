import { Environment, Sparkles } from "@react-three/drei";
import CameraHandler from "./CameraHandler";
import useAppStore from "../store";

const MainScene = () => {
  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  return (
    <>
      <ambientLight />
      <CameraHandler></CameraHandler>
      {cameraPosition === "menu" && (
        <>
          <Sparkles scale={10} count={100} size={1.5} position={[0, 2, 0]}></Sparkles>
          <Environment files={"./assets/hdri/kloppenheim_02_puresky_2k.hdr"} background></Environment>
        </>
      )}
    </>
  );
};

export default MainScene;
