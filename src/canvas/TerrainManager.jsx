import { button, useControls } from "leva";

import Terrain from "./Terrain";
import { useState } from "react";

const TerrainManager = ({ seed, setSeed }) => {
  const randomNumber = (min, max) => Math.floor(Math.random() * Math.max(max - min + 1, 0)) + min;

  const [resolution, setResolution] = useState(randomNumber(10, 20));
  const [height, setHeight] = useState(randomNumber(0.2, 5));

  const controls = useControls("Ground", {
    "Regenerate ground": button(() => {
      setSeed(Date.now());
    }),
  });

  return <Terrain seed={seed} size={resolution} height={height} scale={50} />;
};

export default TerrainManager;
