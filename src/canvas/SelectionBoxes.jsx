import { useEffect, useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

const SelectionBoxes = ({ data }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [hideSelectedBox, setHideSelectedBox] = useState(false);

  const boxesBodies = useRef([]);
  const boxes = useRef([]);

  function selectBox(index) {
    if (selectedBox) return;

    setSelectedBox(index);

    setInterval(() => setHideSelectedBox(true), 3000);
  }

  useEffect(() => {
    if (selectedBox === null) return;

    boxesBodies.current.forEach((box, index) => {
      box.rigidbody?.setEnabled(false);
      box.rigidbody?.setEnabled(true);
      if (selectedBox === index) return;

      box.applyImpulse({ x: 0, y: -5, z: -20 }, true);
    });
  }, [selectedBox]);

  useFrame(() => {
    if (selectedBox === null) return;

    boxes.current.forEach((box, index) => {
      if (selectedBox === index) return;

      box.traverse(node => {
        if (!node.isMesh) return;
        node.material.forEach(side => {
          side.opacity = lerp(side.opacity, 0, 0.02);
        });
      });
    });

    boxesBodies.current[selectedBox].setNextKinematicTranslation({
      x: lerp(boxesBodies.current[selectedBox].translation().x, 0, 0.1),
      y: lerp(boxesBodies.current[selectedBox].translation().y, 1, 0.1),
      z: lerp(boxesBodies.current[selectedBox].translation().z, -2, 0.1),
    });

    if (hideSelectedBox) {
      boxes.current[selectedBox].traverse(node => {
        if (!node.isMesh) return;
        node.material.forEach(side => {
          side.opacity = lerp(side.opacity, 0, 0.02);
        });
      });
    }
  });

  return (
    <group>
      {data.map((box, index) => {
        return (
          <RigidBody
            ref={boxBody => (boxesBodies.current[index] = boxBody)}
            key={index}
            type={selectedBox !== null && selectedBox !== index ? "dynamic" : "kinematicPosition"}
            position={[box.position.x, box.position.y, box.position.z]}
          >
            <mesh ref={box => (boxes.current[index] = box)} onClick={() => selectBox(index)} castShadow>
              <boxGeometry attach='geometry' args={[2, 2, 2]} />
              <meshStandardMaterial attach='material-0' transparent opacity={1} roughness='0.1' color={"red"} />
              <meshStandardMaterial attach='material-1' transparent opacity={1} roughness='0.1' color={"red"} />
              <meshStandardMaterial attach='material-2' transparent opacity={1} roughness='0.1' color={"red"} />
              <meshStandardMaterial attach='material-3' transparent opacity={1} roughness='0.1' color={"red"} />
              <meshStandardMaterial attach='material-4' transparent opacity={1} roughness='0.1' color={"green"} />
              <meshStandardMaterial attach='material-5' transparent opacity={1} roughness='0.1' color={"red"} />
            </mesh>
          </RigidBody>
        );
      })}
    </group>
  );
};

export default SelectionBoxes;
