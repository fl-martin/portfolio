import { Physics, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react";
import SelectionBoxes from "./SelectionBoxes";
import { boxesData } from "../data/boxesData";
import PhysicFloor from "./PhysicFloor";
import { useControls } from "leva";

const PhysicsElements = () => {
  const controls = useControls({
    "Show colliders": false,
    "Gravity": {
      options: { Earth: -9.8, Moon: -1.62, Jupiter: -24.79 },
    },
  });

  return (
    <Suspense fallback='null'>
      <Physics gravity={[0, controls.Gravity, 0]} debug={controls["Show colliders"]}>
        <SelectionBoxes data={boxesData}></SelectionBoxes>
        <PhysicFloor reflector={true} position={[0, -3, 0]} />
      </Physics>
    </Suspense>
  );
};

export default PhysicsElements;
