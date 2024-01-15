import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import ScreenOutline from "./ScreenOutline";
import Screen from "./Screen";
import ScreenPoster from "./ScreenPoster";
import useAppStore from "../store";

const ScreenContainer = ({ data, index, screensArrayLength }) => {
  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const experience = useAppStore(state => state.currentExperience);

  const size = useThree(state => state.size);

  const [portalSize, setPortalSize] = useState({ width: size.width * 0.01, height: size.height * 0.01 });

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (cameraPosition !== "experience" || screen === "menu" || screen === "contact" || screen === "welcome") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [cameraPosition, screen]);

  useEffect(() => {
    setPortalSize({ width: size.width * 0.01, height: size.height * 0.01 });
  }, [size]);

  const totalWidth = screensArrayLength * (portalSize.width + 2); // El 2 es el espacio horizontal entre los elementos
  const centerX = -totalWidth / 2 + portalSize.width / 2; // Calcula la posición X del centro

  return (
    <group position={[centerX + index * (portalSize.width + 2) + 1, data.position.y, data.position.z]}>
      <ScreenOutline data={data} portalSize={portalSize} experienceName={data.name} visible={visible}></ScreenOutline>
      <ScreenPoster data={data} portalSize={portalSize} visible={visible}></ScreenPoster>
      {cameraPosition === "experience" && experience === data.name && <Screen data={data} portalSize={portalSize} />}
    </group>
  );
};

export default ScreenContainer;

// extraer screncontainers de poster
