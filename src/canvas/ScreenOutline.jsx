import { Color } from "three";
import useAppStore from "../store";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const ScreenOutline = ({ portalSize, experienceName, cameraPosition, hovered }) => {
  const screen = useAppStore(state => state.currentScreen);

  const currentExperience = useAppStore(state => state.currentExperience);

  const colorFrom = useMemo(() => new Color("#b04c4c"), []);

  const colorTo = useMemo(() => new Color("#ff96dc"), []);

  const matRef = useRef();

  useFrame(() => {
    matRef.current.color.lerp(hovered || currentExperience === experienceName ? colorTo : colorFrom, 0.1);
  });

  return (
    <>
      <mesh
        position={[0, 0, -0.01]}
        visible={cameraPosition !== "experience" || screen !== "experience"}
        scale={hovered || currentExperience === experienceName ? 1.04 : 1.02}
      >
        <planeGeometry args={[portalSize.width, portalSize.height]} />
        <meshStandardMaterial ref={matRef} />
      </mesh>
    </>
  );
};

export default ScreenOutline;
