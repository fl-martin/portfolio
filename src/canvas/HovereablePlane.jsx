import React from "react";

const HovereablePlane = React.memo(({ position, size, Material, texture, visible, hovered }) => {
  return (
    <mesh position={position} visible={visible}>
      <planeGeometry args={[size.width, size.height]} />
      <Material hovered={hovered} texture={texture} aspectRatio={size?.width / size?.height} />
    </mesh>
  );
});

export default HovereablePlane;
