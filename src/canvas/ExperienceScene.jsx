const ExperienceScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.5} />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      <ambientLight />
      <directionalLight castShadow position={[0, 7, 6]} intensity={1} shadow-mapSize={1024}></directionalLight>
    </>
  );
};

export default ExperienceScene;
