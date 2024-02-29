import { Html } from "@react-three/drei";
import useAppStore from "../store";

const WelcomeScreen = () => {
  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  const setScreen = useAppStore(state => state.setScreen);

  return (
    <>
      {(screen === "welcome" || cameraPosition === "welcome") && (
        <Html position={[0, 10, 100]} center wrapperClass={"w-4/5"}>
          <div className='bg-sky-950/50 p-4  container  flex flex-col justify-between rounded transition-all '>
            <div className='flex md:flex-row flex-col'>
              <div className='text-center md:text-left font-thin text-4xl md:text-6xl text-neutral-200 transition-all '>
                <span style={{ whiteSpace: "nowrap" }}>FEDERICO L.</span> MARTIN
              </div>
              <div className='text-center my-4 md:m-0 md:ml-5 md:mb-2 md:text-justify font-light text-neutral-200 transition-all '>
                Welcome to my portfolio! As a digital creator, I'm passionate about crafting captivating 3D experiences for the web. You'll
                discover a range of projects here, from stunning visualizations to interactive environments.
              </div>
            </div>
            <div className='self-center md:self-end flex flex-wrap justify-center gap-y-2 gap-x-2'>
              <button
                className='px-5 py-2.5 text-center  text-sky-950 transition-all duration-500 bg-gradient-to-br  to-neutral-200 via-amber-600 from-neutral-200 bg-size-200 hover:bg-right-bottom font-medium rounded-lg text-sm '
                onClick={() => {
                  setScreen("menu");
                }}
              >
                Let's explore!
              </button>
              <button
                type='button'
                className='px-5 py-2.5 text-center text-sky-950 transition-all duration-500 bg-gradient-to-br  to-amber-600 via-neutral-200 from-amber-600 bg-size-200 hover:bg-right-bottom font-medium rounded-lg text-sm'
                onClick={() => {
                  setScreen("contact");
                }}
              >
                Contact me
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default WelcomeScreen;
