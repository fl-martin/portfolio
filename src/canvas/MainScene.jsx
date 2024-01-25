import MainBackground from "./MainBackground";
import MainSceneElements from "./MainSceneElements";
import useAppStore from "../store";

const MainScene = ({ children }) => {
  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  return (
    <>
      {children}
      {(cameraPosition !== "experience" || screen !== "experience") && (
        <>
          <MainBackground />
          <MainSceneElements />
        </>
      )}
    </>
  );
};

export default MainScene;
