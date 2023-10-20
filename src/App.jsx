import React from "react";
import { Canvas } from "@react-three/fiber";
import ScreenContainer from "./canvas/ScreenContainer";
import { Stats } from "@react-three/drei";
import PostEffects from "./canvas/PostEffects";
import Overlay from "./dom/Overlay";
import MainScene from "./canvas/MainScene";

const App = () => {
  return (
    <>
      <Canvas camera={{ fov: 70, position: [0, 0, 6] }} shadows style={{ background: "black" }}>
        <MainScene />
        <ScreenContainer experienceName={"rapierDemo"} />
        <PostEffects />
        <Stats showPanel={0} />
      </Canvas>
      <Overlay />
    </>
  );
};

export default App;

//cambiar env por solo fondo
// llevar a su archivo ImageFadeMaterial
// bug rapier, es correcto aplyy impulses asi?
// pantalla menu: fog,  water
// WaveMaterial / WaterShader https://codesandbox.io/s/f5wkx2
// mejorar soft shadows , randomlights?
// AREAS: experiencias visuales / con audio / audio posicional . estaticas / interactivas(click drag, push, shooter, shaderspointer position) . mobil / desktop
// onfadeout https://youtu.be/ma9t7HAOZRg?list=PLpepLKamtPjh5t6N0y5CP463Bt7kWwQ9x&t=1107
// textgeometry https://medium.com/@zmommaerts/how-to-create-3d-text-in-react-three-fiber-a35376456a04  o three-stdlib
// audio analyser
// audio posicional
// Bounds
// ratio scale en rapier
// solucion a fla viewport. cual es la relacion entre viewport y posicion de camara? para calcular exacto. uso de bounds?
// usar textura de rendertexture como input de shader?
// post processing solo en rendertarget https://codesandbox.io/s/drei-rendertexture-forked-bovekp?file=/src/App.js
