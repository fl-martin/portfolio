import { useState } from "react";

const HovereablePlane = ({ position, size, Material }) => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh position={position} onPointerEnter={e => setHover(true)} onPointerLeave={e => setHover(false)}>
      <planeGeometry args={size} />
      <Material hovered={hovered} />
    </mesh>
  );
};

export default HovereablePlane;
