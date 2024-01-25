import { useState } from "react";

const HovereablePlane = ({ position, size, Material, visible, texture }) => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh position={position} onPointerEnter={e => setHover(true)} onPointerLeave={e => setHover(false)}>
      <planeGeometry args={size} />
      <Material hovered={hovered} texture={texture} />
    </mesh>
  );
};

export default HovereablePlane;
