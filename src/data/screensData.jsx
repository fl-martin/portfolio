import { Box } from "@react-three/drei";
import Experience from "../canvas/Experience";
import Experience2 from "../canvas/Experience2";
import Experience3 from "../canvas/Experience3";

export const screensData = [
  {
    name: "rapierDemo1",
    position: { x: -20, y: 0, z: -18 },
    textureURL: "./assets/img/1.png",
    textureOnHoverURL: "./assets/img/2.png",
    outlineColor: "hotpink",
    tagTitle: "Physics (Rapier)",
    experience: <Experience3 />,
  },
  {
    name: "rapierDemo2",
    position: { x: -7, y: 0, z: -20 },
    textureURL: "./assets/img/1.png",
    textureOnHoverURL: "./assets/img/2.png",
    outlineColor: "hotpink",
    tagTitle: "High Quality Rendering",
    experience: <Experience2 />,
  },
  {
    name: "rapierDemo",
    position: { x: 7, y: 0, z: -20 },
    textureURL: "./assets/img/1.png",
    textureOnHoverURL: "./assets/img/2.png",
    outlineColor: "hotpink",
    tagTitle: "Hover Effects (Custom Shader Material)",
    experience: <Experience />,
  },
  {
    name: "rapierDemo4",
    position: { x: 20, y: 0, z: -18 },
    textureURL: "./assets/img/1.png",
    textureOnHoverURL: "./assets/img/2.png",
    outlineColor: "hotpink",
    tagTitle: "Character Controller (Ecctrl)",
    experience: <Box />,
  },
];
