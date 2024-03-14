import PhysicsElements from "./PhysicsElements";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Suspense, useEffect } from "react";
import PhysicFloor from "./PhysicFloor";
import { Color } from "three";

const RapierDemo = () => {
  const scene = useThree(state => state.scene);

  useEffect(() => {
    scene.background = new Color("white");
  }, []);

  const controls = useControls({
    "Show colliders": false,
    "Gravity": {
      options: { Earth: -9.8, Moon: -1.62, Jupiter: -24.79 },
    },
  });

  return (
    <Suspense>
      <Physics gravity={[0, controls.Gravity, 0]} debug={controls["Show colliders"]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.5} />
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
        <ambientLight />
        <directionalLight castShadow position={[0, 20, 5]} intensity={1} shadow-mapSize={1024}></directionalLight>
        <PhysicFloor reflector={false} position={[0, -2, 0]} />
        <PhysicsElements></PhysicsElements>
      </Physics>
    </Suspense>
  );
};

export default RapierDemo;
