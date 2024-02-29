import {
  AccumulativeShadows,
  Center,
  Cloud,
  Clouds,
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useLayoutEffect } from "react";
import { MeshBasicMaterial } from "three";

const ReflectionsShadows = () => {
  const ratioScale = Math.min(2, Math.max(0.1, window.innerWidth / 1920));

  const sphereTextures = useTexture({
    roughnessMap: "./assets/textures/metal1/Metal_006_roughness.jpg",
    aoMap: "./assets/textures/metal1/Metal_006_ambientOcclusion.jpg",
  });

  const boxTextures = useTexture({
    map: "./assets/textures/metal2/Metal_scratched_009_roughness.jpg",
    displacementMap: "./assets/textures/metal2/Metal_scratched_009_height.png",
    normalMap: "./assets/textures/metal2/Metal_scratched_009_normal.jpg",
    roughnessMap: "./assets/textures/metal2/Metal_scratched_009_roughness.jpg",
    aoMap: "./assets/textures/metal2/Metal_scratched_009_ambientOcclusion.jpg",
  });

  const floorTextures = useTexture({
    map: "./assets/textures/marble1/Marble_Tiles_001_basecolor.jpg",
    displacementMap: "./assets/textures/marble1/Marble_Tiles_001_height.png",
    normalMap: "./assets/textures/marble1/Marble_Tiles_001_normal.jpg",
    roughnessMap: "./assets/textures/marble1/Marble_Tiles_001_roughness.jpg",
    aoMap: "./assets/textures/marble1/Marble_Tiles_001_ambientOcclusion.jpg",
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.5} />

      <group position={[0, -0.5, 0]} scale={ratioScale}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[12, 12, 400, 400]} />
          <MeshReflectorMaterial
            emissive={"orange"}
            emissiveIntensity={0.1}
            mirror={0}
            blur={[50, 50]}
            mixBlur={2}
            resolution={512}
            roughness={0.5}
            metalness={0.5}
            {...floorTextures}
          />
        </mesh>
        <Center top>
          <Suzi />
        </Center>
        <Center top position={[-2, 0, 1]}>
          <mesh castShadow>
            <sphereGeometry args={[0.55, 64, 64]} />
            <meshStandardMaterial color='lightblue' metalness={0.6} roughness={0.12} {...sphereTextures} />
          </mesh>
        </Center>
        <Center top position={[2.5, 0, 1]}>
          <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1, 100, 100, 100]} />
            <meshStandardMaterial
              color='indianred'
              metalness={0.45}
              roughness={0.012}
              emissive={"indianred"}
              emissiveIntensity={0.5}
              {...boxTextures}
            />
          </mesh>
        </Center>
        <AccumulativeShadows temporal frames={100} color='black' colorBlend={3} toneMapped={true} alphaTest={1.3} opacity={1} scale={12}>
          <RandomizedLight intensity={0.6} amount={8} radius={4} ambient={0.5} position={[-7, 5, 5]} bias={0.001} />
        </AccumulativeShadows>
        <Clouds material={MeshBasicMaterial}>
          <Cloud segments={35} bounds={[10, 2, 2]} fade={100} volume={3} color='orange' opacity={0.4} speed={0.25} />
          <Cloud seed={5} segments={15} scale={2} volume={3} color='hotpink' fade={100} opacity={0.3} speed={0.3} />
        </Clouds>
      </group>
      <directionalLight position={[-7, 5, 5]} intensity={0.5}></directionalLight>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <Environment files={"./assets/hdri/Contrast-Black-Jewelry-HDRI-Vol2.hdr"}></Environment>
    </>
  );
};

export default ReflectionsShadows;

function Suzi(props) {
  const { scene } = useGLTF("./assets/models/crystal_stone_rock.glb");
  useLayoutEffect(() => {
    scene.traverse(obj => {
      if (!obj.isMesh || obj.material.name === "lambert1") return;
      obj.receiveShadow = obj.castShadow = true;
      obj.material.roughness = 0.9;
      obj.material.metalness = 0.9;
    });
  });
  return <primitive object={scene} {...props} scale={2} />;
}
