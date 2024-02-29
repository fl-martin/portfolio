import { Environment } from "@react-three/drei";

const EnvironmentSetup = ({ file }) => {
  return <Environment files={file} background='true' />;
};

export default EnvironmentSetup;
