import HovereablePlane from "./HovereablePlane";
import useAppStore from "../store";
import { useTexture } from "@react-three/drei";
import ZoomImageMaterial from "../custom/zoomImageMaterial/ZoomImageMaterial";

const ScreenPoster = ({ textureURL, portalSize }) => {
  const texture = useTexture(textureURL);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const screen = useAppStore(state => state.currentScreen);

  return (
    <HovereablePlane
      Material={ZoomImageMaterial}
      size={portalSize}
      texture={texture}
      visible={cameraPosition !== "experience" || screen !== "experience"}
      active={cameraPosition === "menu"}
    ></HovereablePlane>
  );
};

export default ScreenPoster;
