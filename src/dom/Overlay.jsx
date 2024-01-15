import useAppStore from "../store";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";

const Overlay = () => {
  const screen = useAppStore(state => state.currentScreen);

  return (
    <>
      {screen !== "welcome" && (
        <>
          <TopNavbar></TopNavbar> <BottomNavbar></BottomNavbar>
        </>
      )}
    </>
  );
};

export default Overlay;
