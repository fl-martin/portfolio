import useAppStore from "../store";
import { ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";

const CameraModeSwitch = () => {
  const screen = useAppStore(state => state.currentScreen);
  const createDOControls = useAppStore(state => state.createDOControls);
  const cameraMode = useAppStore(state => state.currentCameraMode);
  const setCurrentCameraMode = useAppStore(state => state.setCurrentCameraMode);
  const [switch1, setSwitch1] = useState(false);

  useEffect(() => {
    if (cameraMode === "deviceOrientation") {
      setSwitch1(true);
    }
  }, []);

  useEffect(() => {
    setCurrentCameraMode(switch1 ? "deviceOrientation" : "rig");

    // Se ejecuta aca para que los permisos sean pedidos, si se ejecuta en otro componente, no es considerado accion del usuario?
    if (switch1) createDOControls();
  }, [switch1]);

  return (
    <div className='flex max-w-md flex-col gap-4'>
      <ToggleSwitch checked={switch1} label='Gyro camera' onChange={setSwitch1} disabled={screen !== "menu" && true} />
    </div>
  );
};

export default CameraModeSwitch;
