import { Physics, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react";
import SelectionBoxes from "./SelectionBoxes";
import { boxesData } from "../data/boxesData";
import PhysicFloor from "./PhysicFloor";

const PhysicsElements = () => {
  return (
    <Suspense fallback='null'>
      <Physics>
        <SelectionBoxes data={boxesData}></SelectionBoxes>
        <PhysicFloor reflector={true} position={[0, -5, 0]} />
      </Physics>
    </Suspense>
  );
};

export default PhysicsElements;
