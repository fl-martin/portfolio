import { CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useAppStore from "../store";
import { useFrame, useThree } from "@react-three/fiber";
import { DeviceOrientationControls } from "../custom/controls/DeviceOrientationControlsNew";

const CameraHandler = () => {
  const screen = useAppStore(state => state.currentScreen);
  const cameraMode = useAppStore(state => state.currentCameraMode);
  const setCurrentCameraPosition = useAppStore(state => state.setCurrentCameraPosition);
  const getCurrentExperienceData = useAppStore(state => state.getCurrentExperienceData);
  const cameraControls = useRef();
  const screenRef = useRef(screen);
  const setScreenRef = screen => {
    screenRef.current = screen;
  };
  let currentExperienceData; // convertir esto a estado?
  const [DOControls, setDOControls] = useState(null);
  const camera = useThree(state => state.camera);

  useEffect(() => {
    setScreenRef(screen);
    if (screen === "menu") {
      cameraControls.current.setLookAt(0, 0, 6, 0, 0, -10, true);
      return;
    } else if (screen === "experience") {
      currentExperienceData = getCurrentExperienceData();
      cameraControls.current.setLookAt(
        currentExperienceData.position.x,
        currentExperienceData.position.y,
        currentExperienceData.position.z + 6,
        0,
        0,
        -10,
        true
      );
    }
  }, [screen]);

  useEffect(() => {
    if (cameraMode === "deviceOrientation") {
      setDOControls(new DeviceOrientationControls(camera));
    } else if (DOControls && cameraMode === "rig") {
      DOControls.dispose();
      setDOControls(null);
    }
  }, [cameraMode]);

  useEffect(() => {
    cameraControls.current.addEventListener("rest", () => {
      if (screenRef.current === "experience") setCurrentCameraPosition("experience");
    });
  }, []);

  useFrame(state => {
    if (screen == "menu" && cameraMode == "rig") {
      // Camera Rig animation
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 3, -state.pointer.y * 2, 6, 0, 0, -10, true);
    }
    if (cameraMode === "deviceOrientation" && DOControls) {
      DOControls.update();
    }
  });

  return (
    <>
      <CameraControls
        ref={cameraControls}
        smoothTime={1}
        restThreshold={0.1}
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
        }}
      ></CameraControls>
    </>
  );
};

export default CameraHandler;
