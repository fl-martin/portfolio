import { button, useControls } from "leva";
import { memo, useEffect, useRef, useState } from "react";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Box, Sphere } from "@react-three/drei";
import { Vector3 } from "three";
import PhysicFloor from "./PhysicFloor";
import Cursor from "./Cursor";

const Thing = ({ item, position }) => {
  const Thang = itemMap[item];
  return <Thang position={position} />;
};

const colors = [0x007bff, 0x00c851, 0xffbb33, 0xff2d55, 0x9c27b0, 0xff6d00];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
const useRandomColor = () => {
  const color = randomColor();
  return color;
};

const RigidBox = memo(({ position }) => {
  const color = randomColor();

  const box = useRef(null);

  useEffect(() => {
    const api = box.current;
    if (api) {
      api.applyTorqueImpulse({ x: 0, y: 0, z: 0.2 }, true);
    }
  }, []);

  return (
    <RigidBody colliders='cuboid' ref={box} position={position} density={2}>
      <group scale={1}>
        <Box scale={0.5} receiveShadow castShadow>
          <meshPhysicalMaterial color={color} roughness={0.65} metalness={0.4} flatShading />
        </Box>
      </group>
    </RigidBody>
  );
});

const RigidCylinder = memo(({ position }) => {
  const color = useRandomColor();

  return (
    <RigidBody colliders={false} position={position} restitution={0.1}>
      <mesh castShadow receiveShadow scale={1}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.65} metalness={0.4} flatShading />
      </mesh>
      <CylinderCollider args={[0.2, 0.4]} />
    </RigidBody>
  );
});

const RigidBall = memo(({ position }) => {
  const color = useRandomColor();

  return (
    <RigidBody colliders='ball' position={position} scale={1} restitution={1} friction={2}>
      <Sphere scale={0.2} castShadow receiveShadow>
        <meshPhysicalMaterial color={color} roughness={0.65} metalness={0.4} flatShading />
      </Sphere>
    </RigidBody>
  );
});

const itemMap = {
  Box: RigidBox,
  Cylinder: RigidCylinder,
  Ball: RigidBall,
};

const PhysicsElements = ({ cursorPos, children }) => {
  const [items, setItems] = useState([]);

  console.log("phyelem");

  const addItem = str => {
    setItems(curr => [...curr, str]);
  };

  const controls = useControls("Create element", {
    Mode: {
      options: { Box: "Box", Cylinder: "Cylinder", Ball: "Ball" },
    },
  });

  return (
    <>
      <group
        onPointerMove={e => {
          // Only the mesh closest to the camera will be processed
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          cursorPos.current.copy(e.point);
        }}
        onClick={e => {
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          addItem({ type: controls.Mode, position: [cursorPos.current.x, cursorPos.current.y + 0.7, cursorPos.current.z] });
        }}
      >
        {items.map((item, i) => (
          <Thing item={item.type} position={item.position} key={i} />
        ))}
        {children}
      </group>

      <Cursor position={cursorPos} />
    </>
  );
};

export default PhysicsElements;

// new Vector3(-4 + Math.random() * 8, 10, 0)
