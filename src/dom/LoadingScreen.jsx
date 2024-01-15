import { useTransition, animated } from "@react-spring/web";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
  display: "block",
  borderColor: "red",
  position: "absolute",
  zIndex: 99999,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const LoadingScreen = ({ data = [1, 2, 3] }) => {
  const [transitions, api] = useTransition(data, () => ({
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  }));

  return transitions((style, item) => (
    <animated.div style={{ ...style, zIndex: 99999, width: "100%", height: "100%" }} className={"bg-gray-50 dark:bg-gray-800"}>
      <PropagateLoader
        cssOverride={override}
        color={"#FCA311"}
        size={15}
        aria-label='Loading Spinner'
        data-testid='loader'
      ></PropagateLoader>
    </animated.div>
  ));
};

export default LoadingScreen;
