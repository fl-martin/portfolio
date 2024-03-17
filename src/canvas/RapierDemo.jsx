import PhysicsElements from "./PhysicsElements";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { Suspense, useEffect, useRef } from "react";
import PhysicFloor from "./PhysicFloor";
import { Color, Vector2 } from "three";

const RapierDemo = () => {
  const dirL = useRef();
  const scene = useThree(state => state.scene);

  useEffect(() => {
    scene.background = new Color(0x00aae4);
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
        <ambientLight intensity={0.5} />

        <directionalLight
          castShadow
          position={[-5, 5, -5]}
          intensity={0.7}
          ref={dirL}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-mapSize={new Vector2(1024, 1024)}
        ></directionalLight>
        <PhysicFloor position={[0, -2, 0]} />
        <PhysicsElements></PhysicsElements>
      </Physics>
      <Environment preset='apartment'></Environment>
    </Suspense>
  );
};

export default RapierDemo;
