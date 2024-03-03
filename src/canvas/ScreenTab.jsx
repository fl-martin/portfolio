import { animated, useTransition } from "@react-spring/web";
import { Html } from "@react-three/drei";
const ScreenTab = ({ title, hovered }) => {
  const transitions = useTransition(hovered, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    unique: true,
  });

  return transitions(
    (style, item) =>
      item && (
        <Html position={[0, 6, 0]} scale={[2, 2, 2]} transform occlude>
          <animated.div
            style={style}
            className='flex items-center p-4 mb-4 text-l text-gray-700 font-semibold border border-pink-300 rounded-lg bg-blue-50/50 dark:bg-gray-800/50 dark:text-gray-300'
          >
            <div>{title}</div>
          </animated.div>
        </Html>
      )
  );
};

export default ScreenTab;
