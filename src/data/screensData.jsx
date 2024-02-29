import PointerEffects from "../canvas/PointerEffects";
import ReflectionsShadows from "../canvas/ReflectionsShadows";
import RapierDemo from "../canvas/RapierDemo";
import hqPoster from "../assets/images/hq-rendering-poster.png";
import rapierPoster from "../assets/images/rapier-poster.png";
import pointerEffectsPoster from "../assets/images/pointer-effects-poster.png";

export const screensData = [
  {
    name: "rapierDemo1",
    position: { y: 0, z: -18 },
    textureURL: rapierPoster,
    outlineColor: "hotpink",
    tagTitle: "Physics",
    experience: <RapierDemo />,
  },
  {
    name: "reflectionsShadows",
    position: { y: 0, z: -18 },
    textureURL: hqPoster,
    outlineColor: "hotpink",
    tagTitle: "Reflections & Soft Shadows",
    experience: <ReflectionsShadows />,
  },
  {
    name: "pointerEffects",
    position: { y: 0, z: -18 },
    textureURL: pointerEffectsPoster,
    outlineColor: "hotpink",
    tagTitle: "Pointer Effects",
    experience: <PointerEffects />,
  },
  /*{
    name: "rapierDemo4",
    position: { x: 20, y: 0, z: -18 },
    textureURL: "./assets/img/1.png",
    outlineColor: "hotpink",
    tagTitle: "Character Controller",
    experience: <Box />,
  },*/
];
