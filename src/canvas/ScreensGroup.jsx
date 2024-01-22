import ScreenContainer from "./ScreenContainer";
import { screensData } from "../data/screensData";

const ScreensGroup = () => {
  const ratioScale = Math.min(1, Math.max(0.8, window.innerWidth / 1920));

  return (
    <group scale={ratioScale} position={[0, 0, 5]}>
      {screensData.map((data, index) => {
        return <ScreenContainer data={data} index={index} screensArrayLength={screensData.length} key={index} />;
      })}
    </group>
  );
};

export default ScreensGroup;
