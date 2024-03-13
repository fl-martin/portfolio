import MainBackground from "./MainBackground";
import MainSceneElements from "./MainSceneElements";
import useAppStore from "../store";
import MainLights from "./MainLights";

const MainScene = () => {
  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  return (
    <>
      <MainLights animDirectional={screen === "menu"} />
      <MainBackground visible={cameraPosition !== "experience" || screen !== "experience" ? true : false} />
      <MainSceneElements visible={cameraPosition !== "experience" || screen !== "experience" ? true : false} />
    </>
  );
};

export default MainScene;
