import { useThree } from "@react-three/fiber";
import useAppStore from "../store";
import { useEffect, useState } from "react";
import ScreenOutline from "./ScreenOutline";
import Screen from "./Screen";

const ScreenContainer = ({ experienceName, position, outlineColor }) => {
  const screen = useAppStore(state => state.currentScreen);

  const viewport = useThree(state => state.viewport);

  const [portalSize, setPortalSize] = useState(viewport);

  useEffect(() => {
    if (screen === "menu") {
      setPortalSize(viewport);
      return;
    }
    setPortalSize({ width: viewport.width * 2, height: viewport.height * 2 });
  }, [viewport]);

  return (
    <>
      <ScreenOutline portalSize={portalSize}></ScreenOutline>
      <Screen experienceName={experienceName} portalSize={portalSize} />
    </>
  );
};

export default ScreenContainer;
