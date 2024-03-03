import BottomNavbar from "./BottomNavbar";
import LevaContainer from "./LevaContainer";
import TopNavbar from "./TopNavbar";
import useAppStore from "../store";

const Overlay = () => {
  const screen = useAppStore(state => state.currentScreen);

  return (
    <>
      {screen !== "welcome" && (
        <>
          <TopNavbar></TopNavbar>
          <BottomNavbar></BottomNavbar>
          <LevaContainer />
        </>
      )}
    </>
  );
};

export default Overlay;
