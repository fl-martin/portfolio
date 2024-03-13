import { Object3D } from "three";
import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useThemeMode } from "flowbite-react";

const MainLights = React.memo(({ animDirectional }) => {
  const { computedMode } = useThemeMode();

  const pointer = useThree(state => state.pointer);

  const target = new Object3D();

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

  useEffect(() => {
    if (animDirectional) {
      target.position.set(0, 0, -10);
    }
  }, [screen]);

  useFrame(() => {
    if (computedMode === "dark" && animDirectional) {
      target.position.set(pointer.x * 10, 0, -10);
    }
  });

  return (
    <>
      <animated.hemisphereLight intensity={ambIntensity.value}></animated.hemisphereLight>
      <primitive object={target}></primitive>
      <animated.directionalLight
        intensity={dirIntensity.value}
        position-x={-8}
        position-y={dirPositionY.value}
        castShadow
        target={target}
      ></animated.directionalLight>
    </>
  );
});

export default MainLights;
