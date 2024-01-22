import { useMemo, useRef, useState } from "react";
import useAppStore from "../store";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";
import { useSpring } from "@react-spring/three";
import ScreenTab from "./ScreenTab";

const ScreenOutline = ({ portalSize, experienceName, visible, data }) => {
  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const currentExperience = useAppStore(state => state.currentExperience);

  const colorFrom = useMemo(() => new Color("#b04c4c"), []);

  const colorTo = useMemo(() => new Color("#ff96dc"), []);

  const [hovered, setHovered] = useState(false);

  const setExperience = useAppStore(state => state.setExperience);

  const matRef = useRef();

  useFrame(() => {
    matRef.current.color.lerp(hovered || currentExperience === experienceName ? colorTo : colorFrom, 0.1);
  });

  return (
    <>
      <mesh
        position={[0, 0, -0.01]}
        visible={visible}
        scale={hovered || currentExperience === experienceName ? 1.04 : 1.02}
        //onClick={cameraPosition === "menu" ? () => setExperience(experienceName) : null}
        onPointerEnter={
          cameraPosition === "menu"
            ? () => {
                setHovered(true);
              }
            : null
        }
        onPointerLeave={() => {
          setHovered(false);
        }}
      >
        <planeGeometry args={[portalSize.width, portalSize.height]} />
        <meshStandardMaterial ref={matRef} />
      </mesh>

      {hovered && <ScreenTab title={data.tagTitle}>TAG</ScreenTab>}
    </>
  );
};

export default ScreenOutline;
