import { Tabs } from "flowbite-react";
import { useEffect, useRef } from "react";
import { HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import useAppStore from "../store";

function BottomNavbar() {
  const tabsRef = useRef(null);
  const screen = useAppStore(state => state.currentScreen);
  const setScreen = useAppStore(state => state.setScreen);
  const setBacktoMenu = useAppStore(state => state.setBacktoMenu);
  const setBacktoWelcome = useAppStore(state => state.setBacktoWelcome);

  useEffect(() => {
    if (screen === "welcome") {
      tabsRef.current?.setActiveTab(0);
    } else if (screen === "menu") {
      tabsRef.current?.setActiveTab(1);
    } else if (screen === "contact") {
      tabsRef.current?.setActiveTab(2);
    } else if (screen === "experience") {
      tabsRef.current?.setActiveTab(null);
    }
  }, [screen]);

  return (
    <div className='overflow-x-auto overflow-hidden fixed -bottom-3 left-1/2 -translate-x-1/2 rounded-t-lg z-50 h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300'>
      <Tabs
        aria-label='Full width tabs'
        style='fullWidth'
        ref={tabsRef}
        onActiveTabChange={tab => {
          // setActiveTab(tab);
          if (tab === 0) {
            setBacktoWelcome();
          } else if (tab === 1) {
            setBacktoMenu();
          } else if (tab === 2) {
            setScreen("contact");
          }
        }}
        className='transition-colors duration-300'
      >
        <Tabs.Item title='Welcome' icon={IoHome} className='transition-colors duration-300'></Tabs.Item>
        <Tabs.Item title='Experiences' icon={MdDashboard} className='transition-colors duration-300'></Tabs.Item>
        <Tabs.Item title='Contact' icon={HiClipboardList} className='transition-colors duration-300'></Tabs.Item>
      </Tabs>
    </div>
  );
}

export default BottomNavbar;
