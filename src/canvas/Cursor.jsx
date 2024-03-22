import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { Vector3 } from "three";
import { lerp } from "three/src/math/MathUtils";

const Cursor = React.memo(({ position, visible = true }) => {
  const ref = useRef();
  const curRef = useRef();
  const refMat = useRef();

  const uniforms = {
    color: { value: new Vector3(0.2, 0.0, 0.0) },
    time: { value: 0.0 },
  };

  useFrame(state => {
    refMat.current.uniforms.time.value = state.clock.elapsedTime;
    ref.current.position.x = lerp(ref.current.position.x, position.current.x, 0.1);
    ref.current.position.y = lerp(ref.current.position.y, position.current.y + 1, 0.1);
    ref.current.position.z = lerp(ref.current.position.z, position.current.z, 0.1);
  });

  return (
    <group ref={ref} visible={visible}>
      <Html center distanceFactor={10} position={[0, 0.5, 0]} occlude>
        <div className={"text-center text-gray-600 font-sm w-fit whitespace-nowrap"} style={{ visibility: visible ? "visible" : "hidden" }}>
          Click to
          <br />
          create element
        </div>
      </Html>
      <mesh rotation-x={-Math.PI * 0.5} castShadow ref={curRef}>
        <circleGeometry args={[0.5, 20]} />
        <shaderMaterial
          transparent
          uniforms={uniforms}
          ref={refMat}
          vertexShader={`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`}
          fragmentShader={`
  varying vec2 vUv;
  uniform vec3 color;
  uniform float time; // A-Frame time in milliseconds.
  
  void main() {
      // Calcula un valor de tiempo en segundos
      float timeA = time / 1.0;
  
      // Crea una animación con el tiempo
      float animationSpeed = 1.0;
      float animationOffset = timeA * animationSpeed;
  
      // Calcula la distancia al centro normalizada
      float distToCenter = length(vUv - 0.5);
  
      // Aplica una función de onda sinusoidal para curvas suaves
      float curve = 0.5 + 1.0 * sin(animationOffset + distToCenter * 30.0) * cos(timeA);
  
      // Agrega transparencia basada en la distancia al centro
      float transparency = smoothstep(0.1, 0.5, distToCenter);
  
      // Combina el color uniforme con el gradiente curvado y la transparencia
      vec3 finalColor = mix(color, vec3(0.3, 0.5, 0.9), curve);
  
      // Establece el color del fragmento con transparencia
      gl_FragColor = vec4(finalColor, transparency);
  }
  `}
        />
      </mesh>
    </group>
  );
});

export default Cursor;
