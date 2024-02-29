import ZoomImageMaterial from "../custom/zoomImageMaterial/ZoomImageMaterial";
import FadingImage from "./FadingImage";
import HovereablePlane from "./HovereablePlane";
import zoomImage from "../assets/images/zoom-image.png";
import { useTexture } from "@react-three/drei";

const HoverElements = () => {
  const zoomImageURL = useTexture(zoomImage);

  return (
    <>
      <FadingImage></FadingImage>
      <HovereablePlane
        position={[8, 0, -11]}
        Material={ZoomImageMaterial}
        size={{ width: 6, height: 8 }}
        texture={zoomImageURL}
      ></HovereablePlane>
    </>
  );
};

export default HoverElements;
