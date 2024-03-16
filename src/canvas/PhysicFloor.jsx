import { MeshReflectorMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { MeshStandardMaterial, Vector3 } from "three";
import Cursor from "./Cursor";
import TerrainManager from "./TerrainManager";
const ratioScale = Math.min(2, Math.max(0.1, window.innerWidth / 1920));

const PhysicFloor = ({ reflector, position }) => {
  const cursorPos = useRef(new Vector3());

  return (
    <>
      <RigidBody type='kinematicPosition' colliders='trimesh' position={position}>
        <mesh scale={ratioScale} receiveShadow onPointerMove={e => cursorPos.current.copy(e.point)}>
          <TerrainManager />
          {reflector ? (
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1048}
              mixBlur={1}
              mixStrength={80}
              depthScale={1.2}
              minDepthThreshold={1}
              maxDepthThreshold={1.4}
              color='#050505'
              metalness={0.4}
              roughness={0}
            />
          ) : (
            <meshStandardMaterial color={"red"} opacity={0.7} roughness={0.2} metalness={0.8} />
          )}
        </mesh>
      </RigidBody>
      <Cursor position={cursorPos} />
    </>
  );
};

export default PhysicFloor;
