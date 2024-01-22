import { useTexture } from "@react-three/drei";
import useAppStore from "../store";
import { useEffect, useRef } from "react";
import HovereablePlane from "./HovereablePlane";
import ZoomImageMaterial from "../custom/zoomImageMaterial/ZoomImageMaterial";

const ScreenPoster = ({ data, portalSize, visible }) => {
  const addScreenContainer = useAppStore(state => state.addScreenContainer);

  const texture = useTexture(data.textureURL);

  const groupRef = useRef();

  useEffect(() => {
    addScreenContainer(data.name, groupRef.current);
  }, []);

  return (
    <>
      {/*<mesh position={[0, 0, 0]} ref={groupRef} visible={visible}>
      <planeGeometry args={[portalSize.width, portalSize.height]} />
      <meshBasicMaterial map={texture}></meshBasicMaterial>
    </mesh>*/}
      <HovereablePlane Material={ZoomImageMaterial} size={[portalSize.width, portalSize.height]}></HovereablePlane>
    </>
  );
};

export default ScreenPoster;
