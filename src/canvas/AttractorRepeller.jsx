import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Attractor } from "@react-three/rapier-addons";
import { useControls } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color } from "three";
import { lerp } from "three/src/math/MathUtils";

const AttractorRepeller = () => {
  console.log("attr");
  const controls = useControls("Attractor/Repeller", {
    Mode: {
      options: { Attractor: "+", Repeller: "-", Off: null },
    },
  });

  const [active, setActive] = useState(false);

  const [hovered, setHovered] = useState(false);

  const [attractorStrength, setAttractorStrength] = useState(0);

  const matRef = useRef();

  const colorFrom = useMemo(() => new Color("#b04c4c"), []);

  const colorTo = useMemo(() => new Color("#ff96dc"), []);

  const colorBlue = useMemo(() => new Color("#0000ff"), []);

  const colorRed = useMemo(() => new Color("#ff0000"), []);

  useEffect(() => {
    if (!active) setAttractorStrength(0);
  }, [active]);

  useFrame(() => {
    if (active) {
      setAttractorStrength(state => lerp(state, 1, 0.001));
      matRef.current.color.lerp(controls["Mode"] === "+" ? colorBlue : colorRed, 0.1);
    } else if (!active) {
      matRef.current.color.lerp(hovered ? colorTo : colorFrom, 0.1);
    }
  });

  return (
    <>
      <Attractor range={10} strength={`${controls["Mode"] === null ? 0 : controls["Mode"]}${attractorStrength}`} position={[0, 2, 0]} />
      <RigidBody type={"kinematicPosition"} colliders={"hull"} position={[0, 2, 0]}>
        <mesh
          castShadow
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => {
            setHovered(false);
            setActive(false);
          }}
        >
          <sphereGeometry args={[0.5, 20]} />
          <meshStandardMaterial ref={matRef} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default AttractorRepeller;
