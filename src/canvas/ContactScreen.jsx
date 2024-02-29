import { Html } from "@react-three/drei";
import { Card } from "flowbite-react";
import avatarImg from "../assets/images/avatar-ph.jpg";
import useAppStore from "../store";

const ContactScreen = () => {
  const screen = useAppStore(state => state.currentScreen);

  const cameraPosition = useAppStore(state => state.currentCameraPosition);

  return (
    <>
      {(screen === "contact" || cameraPosition === "contact") && (
        <Html position={[0, 40, -10]} center wrapperClass={"w-4/5"}>
          <Card className='max-w-sm'>
            <div className='flex flex-col items-center pb-5'>
              <img alt='Federico image' height='96' width='96' className='mb-3 rounded-full shadow-lg' src={avatarImg} />
              <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>Federico L. Martin</h5>
              <span className='text-sm text-center text-gray-500 dark:text-gray-400'>
                Creative Developer <br /> Three.js | R3F | WebXR
              </span>
              <div className='mt-4 flex-column space-y-3 lg:mt-6'>
                <div className='flex space-x-3 justify-between'>
                  <a
                    href='#'
                    className='inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
                  >
                    Email
                  </a>
                  <a
                    href='https://flmartin.my.canva.site/about'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                  >
                    CV
                  </a>
                </div>
                <div className='flex space-x-3 justify-between'>
                  <a
                    href='https://www.linkedin.com/in/fl-martin/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
                  >
                    Linkedin
                  </a>
                  <a
                    href='https://github.com/fl-martin'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                  >
                    Github
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </Html>
      )}
    </>
  );
};

export default ContactScreen;
