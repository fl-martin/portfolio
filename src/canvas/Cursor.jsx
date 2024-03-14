import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { MeshStandardMaterial } from "three";
import { lerp } from "three/src/math/MathUtils";

const Cursor = ({ position }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current?.setNextKinematicTranslation({
      x: lerp(ref.current.translation().x, position.current.x, 0.1),
      y: -1.5,
      z: lerp(ref.current.translation().z, position.current.z, 0.1),
    });
  });

  return (
    <RigidBody type={"kinematicPosition"} colliders={"hull"} ref={ref} mass={0.01}>
      <mesh rotation-z={Math.PI} castShadow>
        <sphereGeometry args={[0.2, 20]} />
        <meshStandardMaterial color={"black"} roughness={0} metalness={0.3} />
      </mesh>
    </RigidBody>
  );
};

export default Cursor;
