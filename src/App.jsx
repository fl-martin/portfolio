import CameraHandler from "./canvas/CameraHandler";
import { Canvas } from "@react-three/fiber";
import ContactScreen from "./canvas/ContactScreen";
import LoadingScreen from "./dom/LoadingScreen";
import MainLights from "./canvas/MainLights";
import MainScene from "./canvas/MainScene";
import Overlay from "./dom/Overlay";
import PostEffects from "./canvas/PostEffects";
import React, { Suspense } from "react";
import ScreensGroup from "./canvas/ScreensGroup";
import { Preload, Stats } from "@react-three/drei";
import useAppStore from "./store";
import WelcomeScreen from "./canvas/WelcomeScreen";

const App = () => {
  const cameraMode = useAppStore(state => state.currentCameraMode);

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          camera={{ position: [0, 0, 6] }}
          shadows
          style={{ background: "black" }}
          raycaster={
            cameraMode === "deviceOrientation" && cameraPosition === "menu" && screen === "menu"
              ? {
                  computeOffsets: (_, { size: { width, height } }) => {
                    if (isLocked.current) {
                      return {
                        offsetX: width / 2,
                        offsetY: height / 2,
                      };
                    } else {
                      return null;
                    }
                  },
                }
              : null
          }
        >
          <CameraHandler></CameraHandler>
          <WelcomeScreen></WelcomeScreen>
          <ContactScreen></ContactScreen>
          <MainScene>
            <MainLights></MainLights>
          </MainScene>
          <ScreensGroup />
          <PostEffects />
          <Stats></Stats>
          <Preload all></Preload>
        </Canvas>
      </Suspense>
      <Overlay />
    </>
  );
};

export default App;

// main screen ratio
// posicion dinamica de screens
//cambiar env por solo fondo
// llevar a su archivo ImageFadeMaterial
// bug rapier, es correcto translation asi?
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
