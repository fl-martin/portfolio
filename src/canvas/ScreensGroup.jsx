import Screen from "./Screen";
import ScreenContainer from "./ScreenContainer";
import ScreenPoster from "./ScreenPoster";
import { screensData } from "../data/screensData";
import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import ScreenTab from "./ScreenTab";
import ScreenOutline from "./ScreenOutline";

const ScreensGroup = React.memo(() => {
  const ratioScale = Math.min(1, Math.max(0.8, window.innerWidth / 1920));

  const size = useThree(state => state.size);

  const [portalSize, setPortalSize] = useState({ width: size.width * 0.01, height: size.height * 0.01 });

  useEffect(() => {
    setPortalSize({ width: size.width * 0.01, height: size.height * 0.01 });
  }, [size]);

  return (
    <group scale={ratioScale} position={[0, 0, 5]}>
      {screensData.map((data, index) => {
        return (
          <ScreenContainer data={data} index={index} screensArrayLength={screensData.length} key={index} portalSize={portalSize}>
            <ScreenPoster textureURL={data.textureURL} experienceName={data.name} portalSize={portalSize}></ScreenPoster>
            <ScreenTab title={data.tagTitle} experienceName={data.name} />
            <ScreenOutline data={data} portalSize={portalSize} experienceName={data.name}></ScreenOutline>
            <Screen data={data} portalSize={portalSize} />
          </ScreenContainer>
        );
      })}
    </group>
  );
});

export default ScreensGroup;
