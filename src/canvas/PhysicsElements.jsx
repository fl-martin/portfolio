import { button, useControls } from "leva";
import { memo, useEffect, useRef, useState } from "react";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Box, Sphere } from "@react-three/drei";
import { Vector3 } from "three";

const Thing = ({ item }) => {
  const Thang = itemMap[item];
  return <Thang />;
};

const colors = [0x007bff, 0x00c851, 0xffbb33, 0xff2d55, 0x9c27b0, 0xff6d00];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
const useRandomColor = () => {
  const color = randomColor();
  return color;
};

const RigidBox = memo(() => {
  const color = randomColor();

  const box = useRef(null);

  useEffect(() => {
    const api = box.current;
    if (api) {
      api.applyTorqueImpulse({ x: 0, y: 0, z: 0.2 }, true);
    }
  }, []);

  return (
    <RigidBody colliders='cuboid' ref={box} position={[-4 + Math.random() * 8, 10, 0]}>
      <group scale={1}>
        <Box scale={0.5} receiveShadow castShadow>
          <meshPhysicalMaterial color={color} roughness={0.75} metalness={0.5} flatShading />
        </Box>
      </group>
    </RigidBody>
  );
});

const RigidCylinder = memo(() => {
  const color = useRandomColor();

  return (
    <RigidBody colliders={false} position={[-4 + Math.random() * 8, 10, 0]}>
      <mesh castShadow receiveShadow scale={1}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.75} metalness={0.5} flatShading />
      </mesh>
      <CylinderCollider args={[0.2, 0.4]} />
    </RigidBody>
  );
});

const RigidBall = memo(() => {
  const color = useRandomColor();

  return (
    <RigidBody colliders='ball' position={new Vector3(-4 + Math.random() * 8, 10, 0)} scale={1}>
      <Sphere scale={0.2} castShadow receiveShadow>
        <meshPhysicalMaterial color={color} roughness={0.75} metalness={0.5} flatShading />
      </Sphere>
    </RigidBody>
  );
});

const itemMap = {
  Box: RigidBox,
  Cylinder: RigidCylinder,
  Ball: RigidBall,
};

const PhysicsElements = () => {
  const [items, setItems] = useState([]);

  const addItem = str => {
    setItems(curr => [...curr, str]);
  };

  useControls("Create element", {
    box: button(() => addItem("Box")),
    cylinder: button(() => addItem("Cylinder")),
    ball: button(() => addItem("Ball")),
  });

  return (
    <group scale={1}>
      {items.map((item, i) => (
        <Thing item={item} key={i} />
      ))}
    </group>
  );
};

export default PhysicsElements;
