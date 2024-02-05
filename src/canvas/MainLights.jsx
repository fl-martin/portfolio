import useAppStore from "../store";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useThemeMode } from "flowbite-react";

const MainLights = () => {
  const screen = useAppStore(state => state.currentScreen);

  const { computedMode } = useThemeMode();

  const pointer = useThree(state => state.pointer);

  const targetD = useRef();
  const targetD2 = useRef();

  const [dirIntensity, dirIntensityCtrl] = useSpring(
    () => ({
      value: computedMode === "dark" ? 1 : 0,
      from: computedMode === "dark" ? 1 : 0,
      config: { mass: 1, tension: 70, friction: 26 },
      delay: 2000,
    }),
    [computedMode]
  );

  const [dirPositionY, dirPositionYCtrl] = useSpring(
    () => ({
      value: computedMode === "dark" ? 6 : 0,
      from: computedMode === "dark" ? 6 : 0,
      config: { mass: 1, tension: 70, friction: 26 },
    }),
    [computedMode]
  );

  const [ambIntensity, ambIntensityCtrl] = useSpring(
    () => ({
      value: computedMode === "dark" ? 0 : 0.3,
      from: computedMode === "dark" ? 0 : 0.3,
      config: { mass: 1, tension: 170, friction: 56 },
    }),
    [computedMode]
  );

  useEffect(() => {
    if (computedMode === "dark") {
      dirIntensityCtrl.start({ value: 1 });
      ambIntensityCtrl.start({ value: 0.2, config: { mass: 1, tension: 170, friction: 26 } });
      dirPositionYCtrl.start({ value: 10 });
    } else if (computedMode === "light") {
      dirIntensityCtrl.start({ value: 0 });
      ambIntensityCtrl.start({ value: 0.8, config: { mass: 1, tension: 170, friction: 26 } });
      dirPositionYCtrl.start({ value: 1 });
    }
  }, [computedMode]);

  useFrame(() => {
    if (computedMode === "dark" && screen === "menu") {
      targetD.current?.position.set(pointer.x * 10, 0, -10);
    }
  });

  return (
    <>
      <animated.hemisphereLight intensity={ambIntensity.value}></animated.hemisphereLight>
      <object3D position={[0, 0, -10]} ref={targetD}></object3D>
      <object3D position={[0, 8, -10]} ref={targetD2}></object3D>
      <animated.directionalLight
        intensity={dirIntensity.value}
        position-x={-8}
        position-y={dirPositionY.value}
        target={targetD.current}
        castShadow
      ></animated.directionalLight>
    </>
  );
};

export default MainLights;
