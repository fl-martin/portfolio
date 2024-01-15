import { useState } from "react";

const HovereablePlane = ({ position, Material }) => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh position={position} onPointerOver={e => setHover(true)} onPointerOut={e => setHover(false)}>
      <planeGeometry args={[6, 8]} />
      <Material hovered={hovered} />
    </mesh>
  );
};

export default HovereablePlane;
