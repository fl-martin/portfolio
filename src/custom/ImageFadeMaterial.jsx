import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import CSM from "three-custom-shader-material";
import Frag from "./shaders/frag";
import Vert from "./shaders/vert";
import { Color, DoubleSide, MeshPhysicalMaterial, MeshStandardMaterial, Vector2 } from "three";
import { lerp } from "three/src/math/MathUtils";

export default function ImageFadeMaterial({ originalMaterial, gridWidth, gridHeight, iridescence, color, hovered, tex, tex2, disp }) {
  const uniforms = {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: tex,
    tex2: tex2,
    disp: disp,
  };

  const frag = useMemo(() => `${Frag}`, []);

  const baseMaterialCustom = new MeshPhysicalMaterial({
    color: color ? new Color(color) : null,
    map: originalMaterial ? originalMaterial.map : null,
    roughness: 0.2,
    metalness: 0.49,
    normalMap: originalMaterial ? originalMaterial.normalMap : null,
    normalScale: new Vector2(0.9, -0.5),
    ior: 1.2,
    thickness: 0.9,
    transmission: 1,
    iridescence: iridescence ? iridescence : null,
    side: DoubleSide,
  });

  useFrame((state, delta) => {
    uniforms.dispFactor = lerp(uniforms.dispFactor, hovered ? 1 : 0, 0.075);
  });

  return (
    <ThreeCustomShaderMaterial
      ref={materialRef}
      baseMaterial={baseMat}
      vertexShader={
        /* glsl */ ` varying vec2 vUv;
    void main() {
      vUv = uv;
      csm_Position = position * vec3(2.0);
    }`
      }
      fragmentShader={frag}
      silent
      uniforms={uniforms}
    />
  );
}
