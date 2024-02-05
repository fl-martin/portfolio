import { useState } from "react";

const HovereablePlane = ({ position, portalSize, Material, texture }) => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh position={position} onPointerEnter={e => setHover(true)} onPointerLeave={e => setHover(false)}>
      <planeGeometry args={[portalSize.width, portalSize.height]} />
      <Material hovered={hovered} texture={texture} aspectRatio={portalSize.width / portalSize.height} />
    </mesh>
  );
};

export default HovereablePlane;
