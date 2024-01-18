import { PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

// Project a reticle of the mouse position onto the near plane.
function MouseReticle() {
  const { camera, pointer } = useThree();
  const mouseReticle = useRef();

  useFrame(state => {
    state.events.update();

    if (mouseReticle.current) {
      const vector = new Vector3(pointer.x, pointer.y, -0.8).unproject(camera);
      mouseReticle.current.position.set(...vector.toArray());
    }
  });

  return (
    <mesh ref={mouseReticle}>
      <sphereGeometry args={[0.001, 100, 100]} />
      <meshBasicMaterial color={"hotpink"} />
    </mesh>
  );
}

function PointerLockCamera() {
  const controlsRef = useRef();
  const isLocked = useRef(false);

  return (
    <>
      <MouseReticle />
      <PointerLockControls
        onUpdate={() => {
          if (controlsRef.current) {
            controlsRef.current.addEventListener("lock", () => {
              console.log("lock");
              isLocked.current = true;
            });
            controlsRef.current.addEventListener("unlock", () => {
              console.log("unlock");
              isLocked.current = false;
            });
          }
        }}
        ref={controlsRef}
      />
    </>
  );
}

export default PointerLockCamera;

// a resolver: funciona la segunda vez que se activa, chequear estados
