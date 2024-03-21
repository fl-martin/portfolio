import { RigidBody } from "@react-three/rapier";
import React, { useMemo, useState } from "react";
import { MeshStandardMaterial } from "three";
import TerrainManager from "./TerrainManager";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useTexture } from "@react-three/drei";
const ratioScale = Math.min(2, Math.max(0.1, window.innerWidth / 1920));

const PhysicFloor = ({ position, addItem }) => {
  console.log("floor");

  const textures = useTexture({
    map: "./assets/textures/metal2/Metal_scratched_009_roughness.jpg",
    displacementMap: "./assets/textures/metal2/Metal_scratched_009_height.png",
    normalMap: "./assets/textures/metal2/Metal_scratched_009_normal.jpg",
    roughnessMap: "./assets/textures/metal2/Metal_scratched_009_roughness.jpg",
    aoMap: "./assets/textures/metal2/Metal_scratched_009_ambientOcclusion.jpg",
  });
  const [seed, setSeed] = useState(Date.now()); // Declarado aqui para, junto a "key", generar el remount de RigidBody para actualizar colliders

  const baseMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "red",
        roughness: 0.45,
        metalness: 0.8,
        map: textures.normalMap,
        roughnessMap: textures.roughnessMap,
        flatShading: true,
      }),
    []
  );

  return (
    <>
      <RigidBody type='kinematicPosition' colliders='trimesh' position={position} key={seed}>
        <mesh scale={ratioScale} receiveShadow>
          <TerrainManager seed={seed} setSeed={setSeed} />
          <ThreeCustomShaderMaterial
            baseMaterial={baseMat}
            vertexShader={
              /* glsl */ ` varying vec3 vUv;
        void main() {
          vUv = csm_Position;
        }`
            }
            fragmentShader={` 
            varying vec3 vUv;

            void main() {
              vec3 uv = vUv;

              // Normalizar las coordenadas de textura a [0,1]
              float normalizedY = (uv.y + 2.0) / 40.0;
              
              // Visualizar el valor normalizado de la coordenada y
              csm_DiffuseColor = vec4(uv.y * 0.4 + 1.0, 0.5, -uv.y * 0.2 + 1.0, 1.0);
            }`}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default PhysicFloor;
