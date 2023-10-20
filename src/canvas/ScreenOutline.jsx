import { useState } from "react";
import useAppStore from "../store";

const ScreenOutline = ({ portalSize }) => {
  const [hovered, setHovered] = useState(false);
  const setExperience = useAppStore(state => state.setExperience);

  return (
    <mesh
      position={[0, 0, -9 - 0.001]}
      scale={1.04}
      onClick={() => setExperience("rapierDemo")}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <planeGeometry args={[portalSize.width, portalSize.height]} />
      <meshStandardMaterial color={hovered ? "#ff96dc" : "#ff7070"} />
    </mesh>
  );
};

export default ScreenOutline;
