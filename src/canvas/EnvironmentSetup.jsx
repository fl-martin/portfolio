import { Environment } from "@react-three/drei";

const EnvironmentSetup = ({ file }) => {
  console.log(file);
  return <Environment files={file} background='true' />;
};

export default EnvironmentSetup;
