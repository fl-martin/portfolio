import useAppStore from "../store";
import { useEffect, useRef } from "react";

const ScreenContainer = ({ data, index, screensArrayLength, children, portalSize }) => {
  const setExperience = useAppStore(state => state.setExperience);

  const addScreenContainer = useAppStore(state => state.addScreenContainer);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const setHoveredScreen = useAppStore(state => state.setCurrentHoveredScreen);

  const groupRef = useRef();

  useEffect(() => {
    // Agrega los containers al store, para ser usados por CameraHander
    addScreenContainer(data.name, groupRef.current);
  }, []);

  const totalWidth = screensArrayLength * (portalSize.width + 2); // El 2 es el espacio horizontal entre los elementos
  const centerX = -totalWidth / 2 + portalSize.width / 2; // Calcula la posición X del centro

  return (
    <group
      position={[1.4 + centerX + index * (portalSize.width + 1) + 1, data.position.y, data.position.z]}
      ref={groupRef}
      onClick={cameraPosition === "menu" ? () => setExperience(data.name) : null}
      onPointerEnter={
        cameraPosition === "menu"
          ? () => {
              setHoveredScreen(data.name);
            }
          : null
      }
      onPointerLeave={() => {
        setHoveredScreen(null);
      }}
    >
      {children}
    </group>
  );
};

export default ScreenContainer;
