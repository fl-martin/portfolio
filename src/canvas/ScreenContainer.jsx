import Screen from "./Screen";
import ScreenOutline from "./ScreenOutline";
import ScreenPoster from "./ScreenPoster";
import useAppStore from "../store";
import { useEffect, useRef, useState } from "react";
import ScreenTab from "./ScreenTab";

const ScreenContainer = ({ data, index, screensArrayLength, portalSize }) => {
  const setExperience = useAppStore(state => state.setExperience);

  const addScreenContainer = useAppStore(state => state.addScreenContainer);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const [hovered, setHovered] = useState(false);

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
      onPointerOver={
        cameraPosition === "menu"
          ? () => {
              setHovered(true);
            }
          : null
      }
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      <ScreenPoster textureURL={data.textureURL} experienceName={data.name} portalSize={portalSize} hovered={hovered}></ScreenPoster>
      <ScreenOutline
        data={data}
        portalSize={portalSize}
        experienceName={data.name}
        cameraPosition={cameraPosition}
        hovered={hovered}
      ></ScreenOutline>
      {cameraPosition === "menu" && <ScreenTab title={data.tagTitle} hovered={hovered} />}
      {cameraPosition === "experience" && <Screen data={data} portalSize={portalSize} />}
    </group>
  );
};

export default ScreenContainer;
