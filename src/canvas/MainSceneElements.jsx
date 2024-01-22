import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import plants1URL from "../assets/models/glowing_plants.glb";
import plants2URL from "../assets/models/plants.glb";
import plants3URL from "../assets/models/underwater_plant.glb";
import { useLoader } from "@react-three/fiber";
import Ocean from "./Ocean";
import { useMemo } from "react";

const MainSceneElements = ({ ratioScale }) => {
  const plants1 = useLoader(GLTFLoader, plants1URL);
  const plants2 = useLoader(GLTFLoader, plants2URL);
  const plants3 = useLoader(GLTFLoader, plants3URL);

  plants1.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  plants2.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  plants3.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const plant1clone1 = useMemo(() => plants1.scene.clone(), [plants1]);
  const plant2clone1 = useMemo(() => plants2.scene.clone(), [plants2]);
  const plant3clone1 = useMemo(() => plants3.scene.clone(), [plants3]);
  const plant2clone2 = useMemo(() => plants2.scene.clone(), [plants2]);
  const plant3clone2 = useMemo(() => plants3.scene.clone(), [plants3]);
  const plant1clone3 = useMemo(() => plants1.scene.clone(), [plants1]);
  const plant2clone3 = useMemo(() => plants2.scene.clone(), [plants2]);
  const plant3clone3 = useMemo(() => plants3.scene.clone(), [plants3]);

  return (
    <>
      <group position={[0, -6, -10]} scale={ratioScale} castShadow receiveShadow>
        <primitive position={[4, 0, -6]} rotation={[0, -10, 0]} scale={15} object={plants1.scene} />
        <primitive position={[5, -2, 0]} rotation={[0, -180, 0]} scale={0.04} object={plants2.scene} />
        <primitive position={[8, -2, -5]} rotation={[0, -180, 0]} object={plants3.scene} />
        <primitive position={[11, 0, -2]} rotation={[0, -60, 0]} scale={20} object={plant1clone1} />
        <primitive position={[-8, -2, -3]} rotation={[0, -5, 0]} scale={0.03} object={plant2clone1} />
        <primitive position={[-7, 0, -5]} scale={[0.7, 0.7, 0.7]} rotation={[0, -20, 0]} object={plant3clone1} />
        <primitive position={[-5, -2, 0]} rotation={[0, -180, 0]} scale={0.04} object={plant2clone2} />
        <primitive position={[0, 0, -10]} rotation={[0, -90, 0]} object={plant3clone2} />
        <primitive position={[-3, 0, -5]} rotation={[0, -10, 0]} scale={20} object={plant1clone3} />
        <primitive position={[12, -3, -1]} rotation={[0, 1, 0]} scale={0.04} object={plant2clone3} />
        <primitive position={[-10, -5, -1]} rotation={[0, 0, 0]} object={plant3clone3} />

        <mesh receiveShadow rotation={[Math.PI * -0.5, 0, 0]} position={[0, 0, 10]}>
          <ringGeometry args={[20, 32, 80]}></ringGeometry>
          <meshStandardMaterial emissive={"violet"} color={"violet"} emissiveIntensity={0.7} toneMapped={false}></meshStandardMaterial>
          <Ocean></Ocean>
        </mesh>
      </group>
    </>
  );
};

export default MainSceneElements;
