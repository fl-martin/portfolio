import { animated, useSpring } from "@react-spring/web";
import { Html } from "@react-three/drei";
import { useEffect } from "react";

const ScreenTab = ({ title }) => {
  const [springs, api] = useSpring(() => {
    opacity: 0;
    from: 0;
  });

  useEffect(() => {
    api.start({
      opacity: 1,
    });
  }, []);

  return (
    <Html position={[0, 6, 0]} scale={[2, 2, 2]} transform occlude>
      <animated.div
        style={{ opacity: springs.opacity }}
        className='flex items-center p-4 mb-4 text-l text-gray-700 font-semibold border border-pink-300 rounded-lg bg-blue-50/50 dark:bg-gray-800/50 dark:text-gray-300'
      >
        <div>{title}</div>
      </animated.div>
    </Html>
  );
};

export default ScreenTab;
