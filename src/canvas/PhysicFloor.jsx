import { MeshReflectorMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { MeshStandardMaterial, Vector3 } from "three";
import Cursor from "./Cursor";
import TerrainManager from "./TerrainManager";
const ratioScale = Math.min(2, Math.max(0.1, window.innerWidth / 1920));

const PhysicFloor = ({ position }) => {
  const cursorPos = useRef(new Vector3());

  const [seed, setSeed] = useState(Date.now()); // Declarado aqui para, junto a "key", generar el remount de RigidBody para actualizar colliders

  return (
    <>
      <RigidBody type='kinematicPosition' colliders='trimesh' position={position} key={seed}>
        <mesh scale={ratioScale} receiveShadow onPointerMove={e => cursorPos.current.copy(e.point)}>
          <TerrainManager seed={seed} setSeed={setSeed} />
          <meshStandardMaterial color={"red"} roughness={0.85} metalness={0.3} />
        </mesh>
      </RigidBody>

      <Cursor position={cursorPos} />
    </>
  );
};

export default PhysicFloor;
