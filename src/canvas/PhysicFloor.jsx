import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { MeshStandardMaterial, Vector3 } from "three";
import Cursor from "./Cursor";
import TerrainManager from "./TerrainManager";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
const ratioScale = Math.min(2, Math.max(0.1, window.innerWidth / 1920));

const PhysicFloor = ({ position }) => {
  const textures = useTexture({
    map: "./assets/textures/metal2/Metal_scratched_009_roughness.jpg",
    displacementMap: "./assets/textures/metal2/Metal_scratched_009_height.png",
    normalMap: "./assets/textures/metal2/Metal_scratched_009_normal.jpg",
    roughnessMap: "./assets/textures/metal2/Metal_scratched_009_roughness.jpg",
    aoMap: "./assets/textures/metal2/Metal_scratched_009_ambientOcclusion.jpg",
  });

  const cursorPos = useRef(new Vector3());

  const [seed, setSeed] = useState(Date.now()); // Declarado aqui para, junto a "key", generar el remount de RigidBody para actualizar colliders

  const baseMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "red",
        roughness: 0.55,
        metalness: 0.6,
        map: textures.normalMap,
        roughnessMap: textures.roughnessMap,
        flatShading: true,
      }),
    []
  );

  return (
    <>
      <RigidBody type='kinematicPosition' colliders='trimesh' position={position} key={seed}>
        <mesh scale={ratioScale} receiveShadow onPointerMove={e => cursorPos.current.copy(e.point)}>
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
              csm_DiffuseColor = vec4(uv.y * 0.2 + 1.0, 0.5, -uv.y * 0.2 + 1.0, 1.0);
            }`}
          />
        </mesh>
      </RigidBody>

      <Cursor position={cursorPos} />
    </>
  );
};

export default PhysicFloor;
