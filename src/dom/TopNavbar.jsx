import { DarkThemeToggle, Navbar, NavbarBrand } from "flowbite-react";
import Icon3D from "../assets/icons/3d.png";
import CameraModeSwitch from "./CameraModeSwitch";
import useAppStore from "../store";

const TopNavbar = () => {
  const isMobile = useAppStore(state => state.isMobile);

  return (
    <Navbar
      fluid
      className='border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 fixed w-full top-0 start-0 py-1.5 px-1 md:px-2 transition-colors duration-300'
    >
      <NavbarBrand href='https://fl-martin.github.io/r3f-test/' className='flex items-center space-x-3 rtl:space-x-reverse pl-2'>
        <img src={Icon3D} className='h-5 md:h-8 dark:invert' alt='3D Logo' />
        <span className='self-center text-l md:text-2xl font-extralight whitespace-nowrap dark:text-white'>Federico L. Martin</span>
      </NavbarBrand>
      <div className='flex items-center'>
        {isMobile && <CameraModeSwitch />}
        <DarkThemeToggle className='text-amber-500 dark:text-amber-500 hover:bg-gray-200 focus:ring-0 p-0.5 mx-2 md:mr-0 md:ml-2 md:p-2.5'></DarkThemeToggle>
      </div>
    </Navbar>
  );
};

export default TopNavbar;
