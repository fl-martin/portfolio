import { BackSide } from "three";
import { Environment } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useThemeMode } from "flowbite-react";

const MainBackground = () => {
  const { computedMode } = useThemeMode();

  const springs = useSpring({
    color: computedMode === "dark" ? "#ff6d6d" : "#569AFF",
    config: { mass: 100, tension: 1, friction: 260 },
    from: computedMode === "dark" ? "#ff6d6d" : "#569AFF",
  });

  return (
    <Environment frames={Infinity} files={"./assets/hdri/kloppenheim_02_puresky_2k.hdr"} background>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <animated.meshStandardMaterial color={springs.color} side={BackSide} transparent opacity={0.5}></animated.meshStandardMaterial>
      </mesh>
    </Environment>
  );
};

export default MainBackground;
