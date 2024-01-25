import ScreenOutline from "./ScreenOutline";
import ScreenTab from "./ScreenTab";
import useAppStore from "../store";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

const ScreenContainer = ({ data, index, screensArrayLength, children }) => {
  const setExperience = useAppStore(state => state.setExperience);

  const addScreenContainer = useAppStore(state => state.addScreenContainer);

  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const size = useThree(state => state.size);

  const [portalSize, setPortalSize] = useState({ width: size.width * 0.01, height: size.height * 0.01 });

  const [hovered, setHovered] = useState(false);

  const [visible, setVisible] = useState(true);

  const groupRef = useRef();

  useEffect(() => {
    // Agrega los containers al store, para ser usados por CameraHander
    addScreenContainer(data.name, groupRef.current);
  }, []);

  useEffect(() => {
    // Oculta pantallas al estar dentro de una experiencia
    if (cameraPosition === "experience" && screen === "experience") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [cameraPosition, screen]);

  useEffect(() => {
    setPortalSize({ width: size.width * 0.01, height: size.height * 0.01 });
  }, [size]);

  const totalWidth = screensArrayLength * (portalSize.width + 2); // El 2 es el espacio horizontal entre los elementos
  const centerX = -totalWidth / 2 + portalSize.width / 2; // Calcula la posición X del centro

  return (
    <group
      position={[1.4 + centerX + index * (portalSize.width + 1) + 1, data.position.y, data.position.z]}
      ref={groupRef}
      // onClick={cameraPosition === "menu" ? () => setExperience(data.name) : null}
      onPointerEnter={
        cameraPosition === "menu"
          ? () => {
              setHovered(true);
            }
          : null
      }
      onPointerLeave={() => {
        setHovered(false);
      }}
    >
      <ScreenOutline data={data} portalSize={portalSize} experienceName={data.name} visible={visible} hovered={hovered}></ScreenOutline>
      <ScreenTab title={data.tagTitle} hovered={hovered} />
      {children}
    </group>
  );
};

export default ScreenContainer;
