import { MeshReflectorMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
const ratioScale = Math.min(2, Math.max(0.1, window.innerWidth / 1920));

const PhysicFloor = ({ reflector, position }) => {
  return (
    <>
      {reflector ? (
        <RigidBody type='kinematicPosition' position={position}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} scale={ratioScale}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1048}
              mixBlur={1}
              mixStrength={80}
              roughness={0.35}
              depthScale={1.2}
              minDepthThreshold={1}
              maxDepthThreshold={1.4}
              color='#050505'
              metalness={0.5}
            />
          </mesh>
        </RigidBody>
      ) : (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow scale={ratioScale}>
          <planeGeometry args={[1000, 1000]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
      )}
    </>
  );
};

export default PhysicFloor;
