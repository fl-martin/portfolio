import { lerp } from "three/src/math/MathUtils";
import { MeshStandardMaterial } from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";

function FadingImage() {
  const ref = useRef();
  const materialRef = useRef();

  const [texture1, texture2, dispTexture] = useTexture(["./assets/img/1.png", "./assets/img/2.png", "./assets/img/3.png"]);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    materialRef.current.uniforms.dispFactor.value = lerp(materialRef.current.uniforms.dispFactor.value, hovered ? 1 : 0, 0.075);
  });

  const uniforms = useMemo(
    () => ({
      effectFactor: { value: 1.2 },
      dispFactor: { value: 0 },
      tex: { value: texture1 },
      tex2: { value: texture2 },
      disp: { value: dispTexture },
    }),
    []
  );

  const frag = useMemo(
    () => /* glsl */ ` 
  varying vec2 vUv;
  uniform sampler2D tex;
  uniform sampler2D tex2;
  uniform sampler2D disp;
  uniform float uTime;
  uniform float _rot;
  uniform float dispFactor;
  uniform float effectFactor;
  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
    vec4 _texture = texture2D(tex, distortedPosition);
    vec4 _texture2 = texture2D(tex2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    csm_DiffuseColor = finalTexture;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`,
    []
  );

  const baseMat = useMemo(() => new MeshStandardMaterial({ roughness: 0.1, metalness: 0.8 }), []);

  return (
    <mesh onPointerOver={e => setHover(true)} onPointerOut={e => setHover(false)} position={[0, 0, -11]}>
      <planeGeometry args={[6, 8]} />

      <ThreeCustomShaderMaterial
        ref={materialRef}
        baseMaterial={baseMat}
        vertexShader={
          /* glsl */ ` varying vec2 vUv;
        void main() {
          vUv = uv;
        }`
        }
        fragmentShader={frag}
        silent
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default FadingImage;
