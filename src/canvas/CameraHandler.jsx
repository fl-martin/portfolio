import { CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useAppStore from "../store";
import { useFrame, useThree } from "@react-three/fiber";
import { DeviceOrientationControls } from "../custom/controls/DeviceOrientationControls";
import PointerLockCamera from "./PointerLockCamera";

const CameraHandler = () => {
  const screen = useAppStore(state => state.currentScreen);
  const currentExperience = useAppStore(state => state.currentExperience);
  const cameraMode = useAppStore(state => state.currentCameraMode);
  const cameraPosition = useAppStore(state => state.currentCameraPosition);
  const setCurrentCameraPosition = useAppStore(state => state.setCurrentCameraPosition);
  const screensContainers = useAppStore(state => state.screensContainers);
  const setCreateDOControls = useAppStore(state => state.setCreateDOControls);
  const camera = useThree(state => state.camera);
  const size = useThree(state => state.size);
  const [DOControls, setDOControls] = useState(null);
  const cameraControls = useRef();
  const screenRef = useRef(screen);
  // Ref a utilizar dentro de un event listener, para acceder al ultimo estado (https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559)
  const setScreenRef = screen => {
    screenRef.current = screen;
  };
  const [restThreshold, setRestThreshold] = useState(5);

  useEffect(() => {
    setScreenRef(screen);
    if (screen === "welcome") {
      setRestThreshold(0.7);

      cameraControls.current.setLookAt(0, 0, 25, 0, 10, 100, true);
    } else if (screen === "menu") {
      setRestThreshold(0.9);

      cameraControls.current.setLookAt(0, 0, 10, 0, 0, -10, true);
    } else if (screen === "contact") {
      setRestThreshold(0.9);

      cameraControls.current.setLookAt(0, 2, 0, 0, 40, -10, true);
    } else if (screen === "experience" && cameraPosition !== "experience") {
      setRestThreshold(0.005);

      // Revisar solucion desde el control de estado. actualmente si no se usa set time out, no posiciona la cam en la posicion correcta
      setTimeout(() => {
        cameraControls.current.fitToBox(screensContainers[currentExperience], true, { cover: true });
      }, 100);
    } else if (cameraPosition === "experience" && screen === "experience") {
      setTimeout(() => {
        cameraControls.current.fitToBox(screensContainers[currentExperience], false, { cover: true });
      }, 100);
    }
  }, [screen, size]);

  useEffect(() => {
    if (cameraMode === "deviceOrientation") {
      // Centra la camara al cambiar el modo
      cameraControls.current.setLookAt(0, 0, 6, 0, 0, -10, true);
    } else if (DOControls && cameraMode === "rig") {
      DOControls.dispose();

      setDOControls(null);
    }
  }, [cameraMode]);

  useEffect(() => {
    // Se hace de este modo para que IOS solicite el acceso a la camara, createDOControls es llamado directamente por el switch
    setCreateDOControls(() => setDOControls(new DeviceOrientationControls(camera)));

    cameraControls.current.setLookAt(0, 0, 25, 0, 40, 100, false);

    cameraControls.current.addEventListener("rest", () => {
      setCurrentCameraPosition(screenRef.current);
    });
  }, []);

  useFrame(state => {
    if (screen == "welcome") {
      // Camera Rig animation
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 10, -state.pointer.y * 5, 25, 0, 10, 100, true);
    } else if (screen === "contact") {
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 5, -state.pointer.y * 5 + 20, 0, 0, 40, -10, true);
    } else if (screen == "menu" && cameraMode == "rig") {
      // Camera Rig animation
      cameraControls.current.setLookAt((state.pointer.x * state.viewport.width) / 10, -state.pointer.y * 2, 10, 0, 0, -10, true);
    } else if (cameraMode === "deviceOrientation" && cameraPosition === "menu" && screen === "menu" && DOControls?.enabled) {
      // DeviceOrientationControls update, una vez que la camara esta en posicion menu
      DOControls.update();
    }
  });

  return (
    <>
      <CameraControls
        ref={cameraControls}
        smoothTime={0.5}
        restThreshold={restThreshold}
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
      {cameraMode === "deviceOrientation" && cameraPosition === "menu" && screen === "menu" && <PointerLockCamera></PointerLockCamera>}
    </>
  );
};

export default CameraHandler;
