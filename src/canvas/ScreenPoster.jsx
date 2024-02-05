import HovereablePlane from "./HovereablePlane";
import { useTexture } from "@react-three/drei";
import ZoomImageMaterial from "../custom/zoomImageMaterial/ZoomImageMaterial";

const ScreenPoster = ({ textureURL, portalSize }) => {
  const texture = useTexture(textureURL);

  return <HovereablePlane Material={ZoomImageMaterial} portalSize={portalSize} texture={texture}></HovereablePlane>;
};

export default ScreenPoster;
