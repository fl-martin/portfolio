import ScreenContainer from "./ScreenContainer";
import { screensData } from "../data/screensData";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

const ScreensGroup = () => {
  const ratioScale = Math.min(1, Math.max(0.9, window.innerWidth / 1920));

  const size = useThree(state => state.size);

  const [portalSize, setPortalSize] = useState({ width: size.width * 0.01, height: size.height * 0.01 });

  useEffect(() => {
    setPortalSize({ width: size.width * 0.01, height: size.height * 0.01 });
  }, [size]);

  return (
    <group scale={ratioScale} position={[0, 0, 5]}>
      {screensData.map((data, index) => {
        return (
          <ScreenContainer
            data={data}
            index={index}
            screensArrayLength={screensData.length}
            key={index}
            portalSize={portalSize}
          ></ScreenContainer>
        );
      })}
    </group>
  );
};

export default ScreensGroup;
