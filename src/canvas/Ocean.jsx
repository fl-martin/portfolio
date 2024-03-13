import React, { useRef, useMemo, useEffect } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

extend({ Water });

function Ocean() {
  const ref = useRef();
  const gl = useThree(state => state.gl);
  const waterNormals = useMemo(
    () => useLoader(THREE.TextureLoader, "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"),
    []
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.CircleGeometry(20, 80), []);
  const config = useMemo(
    () => ({
      textureWidth: 750,
      textureHeight: 750,
      waterNormals,
      sunDirection: new THREE.Vector3(0, 0, 10),
      sunColor: "orange",
      waterColor: 0x96d3ff,
      distortionScale: 0.15,
      size: 0.5,
      fog: true,
      time: 1,
      format: gl.encoding,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals]
  );
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));
  return <water ref={ref} args={[geom, config]} position={[0, 0, 0.1]} />;
}

export default Ocean;
