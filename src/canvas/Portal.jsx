import { OrbitControls, Sky, Environment, useFBO, ContactShadows, PerspectiveCamera, SoftShadows } from "@react-three/drei";
import { Canvas, useFrame, createPortal, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import {
  KernelSize,
  EffectComposer,
  BloomEffect,
  EffectPass,
  RenderPass,
  CopyPass,
  BlendFunction,
  ClearPass,
  SavePass,
  TextureEffect,
} from "postprocessing";
import { Scene } from "three";
import PhysicsElements from "./PhysicsElements";
import EnvironmentSetup from "./EnvironmentSetup";
import Floor from "./Floor";
import FadingImage from "./FadingImage";

const Portal = () => {
  const mesh = useRef();
  const otherCamera = useRef();
  const otherScene = new Scene();

  const useComposer = true;

  const renderTarget = useFBO();

  const { gl, camera, scene } = useThree();

  const [refresh, setRefresh] = useState(false);

  let composer = useMemo(() => {
    if (!otherCamera.current?.position) return;

    const composer = new EffectComposer(gl);
    composer.autoRenderToScreen = false;

    const renderPass = new RenderPass(otherScene, otherCamera.current);

    const bloomEffect = new BloomEffect({
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.0,
      radius: 10,
      height: 600,
    });
    const effectPass = new EffectPass(otherCamera.current, bloomEffect);

    const copyPass = new CopyPass(renderTarget);

    composer.addPass(renderPass);
    if (useComposer) composer.addPass(effectPass);
    composer.addPass(copyPass);

    /*
      console.log(
        composer,
        otherScene.children,
        composer.passes[0].scene.children,
        otherCamera.current?.position,
        composer.passes[0].camera.position
      );
      */

    return composer;
  }, [gl, otherScene, otherCamera?.current, renderTarget, refresh, useComposer]);

  useFrame(state => {
    const { clock } = state;
    otherCamera.current.matrixWorldInverse.copy(camera.matrixWorldInverse);

    if (composer) composer.render();
    else if (otherCamera.current?.position && !refresh) setRefresh(true);

    mesh.current.material.map = renderTarget.texture;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <PerspectiveCamera ref={otherCamera} manual aspect={1 / 1} position={[0, 0, 5]} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />

      {createPortal(
        <>
          <SoftShadows size={200} focus={0} samples={60} />
          <ambientLight />
          <directionalLight castShadow position={[0, 7, 6]} intensity={1} shadow-mapSize={1024}></directionalLight>
          <Floor />
          <FadingImage></FadingImage>
          <PhysicsElements></PhysicsElements>
        </>,
        otherScene
      )}
      <mesh ref={mesh} position={[0, 0, 1]}>
        <planeGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Portal;
