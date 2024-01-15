import ZoomImageMaterial from "../custom/zoomImageMaterial/ZoomImageMaterial";
import FadingImage from "./FadingImage";
import HovereablePlane from "./HovereablePlane";

const HoverElements = () => {
  return (
    <>
      <FadingImage></FadingImage>
      <HovereablePlane position={[6, 0, -11]} Material={ZoomImageMaterial}></HovereablePlane>
    </>
  );
};

export default HoverElements;
