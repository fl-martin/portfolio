import CameraHandler from "./CameraHandler";
import { DirectionalLightHelper } from "three";
import MainBackground from "./MainBackground";
import MainSceneElements from "./MainSceneElements";
import useAppStore from "../store";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useThemeMode } from "flowbite-react";

const MainScene = () => {
  const screen = useAppStore(state => state.currentScreen);

  const pointer = useThree(state => state.pointer);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const ratioScale = Math.min(1, Math.max(0.8, window.innerWidth / 1920));

  const { computedMode } = useThemeMode();

  const dirLight = useRef(null);

  const targetD = useRef();

  //useHelper(dirLight, DirectionalLightHelper, 1, "red");

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
      ambIntensityCtrl.start({ value: 0, config: { mass: 1, tension: 170, friction: 26 } });
      dirPositionYCtrl.start({ value: 10 });
    } else if (computedMode === "light") {
      dirIntensityCtrl.start({ value: 0 });
      ambIntensityCtrl.start({ value: 0.8, config: { mass: 1, tension: 170, friction: 26 } });
      dirPositionYCtrl.start({ value: 1 });
    }
  }, [computedMode]);

  useFrame(() => {
    if (computedMode === "dark") {
      targetD.current.position.set(pointer.x * 10, 0, -10);
    }
  });

  return (
    <>
      <object3D position={[pointer.x * 10, 0, -10]} ref={targetD}></object3D>
      <animated.hemisphereLight intensity={ambIntensity.value}></animated.hemisphereLight>
      <animated.directionalLight
        intensity={dirIntensity.value}
        position-x={-8}
        position-y={dirPositionY.value}
        target={targetD.current}
        castShadow
        ref={dirLight}
      ></animated.directionalLight>
      <CameraHandler></CameraHandler>
      {(cameraPosition !== "experience" || screen === "menu" || screen === "contact" || screen === "welcome") && (
        <>
          <MainBackground computedMode={computedMode} />
          <MainSceneElements ratioScale={ratioScale} />
        </>
      )}
    </>
  );
};

export default MainScene;
