import useAppStore from "../store";

const Overlay = () => {
  const screen = useAppStore(state => state.currentScreen);
  const cameraMode = useAppStore(state => state.currentCameraMode);
  const setBacktoMenu = useAppStore(state => state.setBacktoMenu);
  const setCurrentCameraMode = useAppStore(state => state.setCurrentCameraMode);

  return (
    <>
      <div
        style={{
          position: "absolute",
          fontSize: "large",
          zIndex: 99999,
          top: 0,
          right: 0,
          display: screen === "experience" ? "block" : "none",
        }}
        onClick={() => setBacktoMenu()}
      >
        <button>X</button>
      </div>
      <div
        style={{ position: "absolute", fontSize: "large", zIndex: 99999, top: 20, right: 0 }}
        onClick={() => setCurrentCameraMode(cameraMode === "rig" ? "deviceOrientation" : "rig")}
      >
        <button>Camera Mode</button>
      </div>
    </>
  );
};

export default Overlay;
