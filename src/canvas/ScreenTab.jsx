import { animated } from "@react-spring/web";
import { Html } from "@react-three/drei";

const ScreenTab = ({ opacity, title }) => {
  return (
    <Html position={[0, 6, 0]} scale={[2, 2, 2]} transform occlude>
      <animated.div
        style={{ opacity: opacity || 0 }}
        className='flex items-center p-4 mb-4 text-l text-gray-600 font-semibold border border-pink-300 rounded-lg bg-blue-50/50 dark:bg-gray-800/50 dark:text-blue-400 dark:border-blue-800'
      >
        <div>{title}</div>
      </animated.div>
    </Html>
  );
};

export default ScreenTab;
