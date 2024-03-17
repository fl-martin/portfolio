import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Attractor } from "@react-three/rapier-addons";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils";

const Cursor = ({ position }) => {
  const [pointerDown, setPointerDown] = useState(false);

  const [attractorStrength, setAttractorStrength] = useState(0);

  useEffect(() => {
    window.addEventListener("pointerdown", () => setPointerDown(true));
    window.addEventListener("pointerup", () => {
      setPointerDown(false);
    });
  }, []);

  useEffect(() => {
    if (!pointerDown) setAttractorStrength(0);
  }, [pointerDown]);

  const ref = useRef();

  //use usecontext?
  useFrame(() => {
    ref.current?.setNextKinematicTranslation({
      x: lerp(ref.current.translation().x, position.current.x, 0.1),
      y: lerp(ref.current.translation().y, position.current.y + 0.6, 0.1),
      z: lerp(ref.current.translation().z, position.current.z, 0.1),
    });

    if (pointerDown) {
      setAttractorStrength(state => lerp(state, 1, 0.001));
    }
  });

  const controls = useControls("3D Cursor", {
    "On click": {
      options: { Attractor: null, Repeller: "-", None: null },
    },
  });

  return (
    <RigidBody type={"kinematicPosition"} colliders={"hull"} ref={ref} mass={0.001}>
      <Attractor range={5} strength={`${controls["On click"] + attractorStrength}`} />
      <mesh rotation-z={Math.PI} castShadow>
        <sphereGeometry args={[0.2, 20]} />
        <meshStandardMaterial color={"black"} roughness={0} metalness={0.3} />
      </mesh>
    </RigidBody>
  );
};

export default Cursor;
