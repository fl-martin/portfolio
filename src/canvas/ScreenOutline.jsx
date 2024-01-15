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

  const [springs, api] = useSpring(() => {
    opacity: 0;
  });

  useFrame(() => {
    matRef.current.color.lerp(hovered || currentExperience === experienceName ? colorTo : colorFrom, 0.1);
  });

  return (
    <>
      <mesh
        position={[0, 0, -0.01]}
        visible={visible}
        scale={hovered || currentExperience === experienceName ? 1.04 : 1.02}
        onClick={cameraPosition === "menu" ? () => setExperience(experienceName) : null}
        onPointerEnter={
          cameraPosition === "menu"
            ? () => {
                setHovered(true);
                api.start({
                  opacity: 1,
                });
              }
            : null
        }
        onPointerLeave={() => {
          setHovered(false);
          api.start({
            opacity: 0,
          });
        }}
      >
        <planeGeometry args={[portalSize.width, portalSize.height]} />
        <meshStandardMaterial ref={matRef} />
      </mesh>

      <ScreenTab title={data.tagTitle} opacity={springs.opacity || 0}>
        TAG
      </ScreenTab>
    </>
  );
};

export default ScreenOutline;
