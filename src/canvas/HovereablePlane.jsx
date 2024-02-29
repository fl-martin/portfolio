import { useState } from "react";

const HovereablePlane = ({ position, size, Material, texture, visible, active = true }) => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh position={position} onPointerEnter={active ? e => setHover(true) : null} onPointerLeave={e => setHover(false)} visible={visible}>
      <planeGeometry args={[size.width, size.height]} />
      <Material hovered={hovered} texture={texture} aspectRatio={size?.width / size?.height} />
    </mesh>
  );
};

export default HovereablePlane;
