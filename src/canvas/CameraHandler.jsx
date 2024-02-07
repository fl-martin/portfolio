import { CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useAppStore from "../store";
import { useFrame, useThree } from "@react-three/fiber";
import { DeviceOrientationControls } from "../custom/controls/DeviceOrientationControls";
import PointerLockCamera from "./PointerLockCamera";

const CameraHandler = () => {
  const isMobile = useAppStore(state => state.isMobile);
  const screen = useAppStore(state => state.currentScreen);
  const currentExperience = useAppStore(state => state.currentExperience);
  const cameraMode = useAppStore(state => state.currentCameraMode);
  const cameraPosition = useAppStore(state => state.currentCameraPosition);
  const setCurrentCameraPosition = useAppStore(state => state.setCurrentCameraPosition);
  const screensContainers = useAppStore(state => state.screensContainers);
  const setCreateDOControls = useAppStore(state => state.setCreateDOControls);
  const camera = useThree(state => state.camera);
  const size = useThree(state => state.size);
  const gl = useThree(state => state.gl);
  const [DOControls, setDOControls] = useState(null);
  const [initAnimCompleted, setInitAnimCompleted] = useState(false);
  const cameraControls = useRef();
  const screenRef = useRef(screen);
  // Ref a utilizar dentro de un event listener, para acceder al ultimo estado (https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559)
  const setScreenRef = screen => {
    screenRef.current = screen;
  };

  async function firstAnimation() {
    cameraControls.current.smoothTime = 1;

    await cameraControls.current.rotateTo(0, -20, true);
    await cameraControls.current.setLookAt(0, 5, 30, 0, -5, 0, true);
    await cameraControls.current.setLookAt(0, 0, 25, 0, 10, 100, true);

    setInitAnimCompleted(true);
  }

  useEffect(() => {
    setScreenRef(screen);
    if (screen === "welcome") {
      cameraControls.current.restThreshold = 0.7;

      cameraControls.current.smoothTime = 1;
    } else if (screen === "menu") {
      cameraControls.current.restThreshold = 0.9;

      cameraControls.current.smoothTime = 0.5;

      cameraControls.current.setLookAt(0, 0, 10, 0, 0, -10, true);
    } else if (screen === "contact") {
      cameraControls.current.restThreshold = 0.9;

      cameraControls.current.smoothTime = 0.5;
    } else if (screen === "experience" && cameraPosition !== "experience") {
      cameraControls.current.restThreshold = 0.005;

      cameraControls.current.smoothTime = 0.5;

      // Revisar solucion desde el control de estado. actualmente si no se usa set time out, no posiciona la cam en la posicion correcta
      setTimeout(() => {
        cameraControls.current.fitToBox(screensContainers[currentExperience], true, {
          cover: true,
          paddingTop: -0.1,
          paddingLeft: -0.1,
          paddingRight: -0.1,
          paddingBottom: -0.1,
        });
      }, 100);
    } else if (cameraPosition === "experience" && screen === "experience") {
      setTimeout(() => {
        cameraControls.current.fitToBox(screensContainers[currentExperience], false, {
          cover: true,
          paddingTop: -0.1,
          paddingLeft: -0.1,
          paddingRight: -0.1,
          paddingBottom: -0.1,
        });
      }, 100);
    }
  }, [screen, size]);

  useEffect(() => {
    if (!isMobile) cameraControls.current.disconnect();
  }, []);

  useEffect(() => {
    // solo en dispositivos mobiles, via CameraModeSwitch
    if (cameraMode === "deviceOrientation") {
      cameraControls.current.disconnect();

      // Centra la camara al cambiar el modo
      cameraControls.current.setLookAt(0, 0, 6, 0, 0, -10, true);
    } else if (DOControls && cameraMode === "rig") {
      DOControls.dispose();

      setDOControls(null);

      cameraControls.current.connect(gl.domElement);
    }
  }, [cameraMode]);

  useEffect(() => {
    // Se hace de este modo para que IOS solicite el acceso a la camara, createDOControls es llamado directamente por el switch
    setCreateDOControls(() => setDOControls(new DeviceOrientationControls(camera)));

    firstAnimation();

    cameraControls.current.addEventListener("rest", () => {
      setCurrentCameraPosition(screenRef.current);
    });
  }, []);

  useFrame(state => {
    if (!initAnimCompleted) return;

    if (screen == "welcome" && !isMobile) {
      // Camera Rig animation
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 10, -state.pointer.y * 5, 25, 0, 10, 100, true);
    } else if (screen === "contact" && !isMobile) {
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 5, -state.pointer.y * 5 + 20, 0, 0, 40, -10, true);
    } else if (screen == "menu" && cameraMode == "rig" && !isMobile) {
      // Camera Rig animation
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 10, -state.pointer.y * 2, 10, 0, 0, -10, true);
    } else if (cameraMode === "deviceOrientation" && cameraPosition === "menu" && screen === "menu" && DOControls?.enabled) {
      // DeviceOrientationControls update, una vez que la camara esta en posicion menu
      DOControls.update();
    }
  });

  return (
    <>
      <CameraControls ref={cameraControls} smoothTime={0.25} restThreshold={0.005}></CameraControls>
      {cameraMode === "deviceOrientation" && cameraPosition === "menu" && screen === "menu" && <PointerLockCamera></PointerLockCamera>}
    </>
  );
};

export default CameraHandler;
