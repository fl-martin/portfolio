import { create } from "zustand";

const useAppStore = create((set, get) => ({
  currentScreen: "welcome",
  setScreen: screen => set(state => ({ currentScreen: screen })),
  currentExperience: null,
  setExperience: experience => set(state => ({ currentExperience: experience, currentScreen: "experience" })),
  setBacktoMenu: () => set(state => ({ currentExperience: null, currentScreen: "menu" })), // que onda con estos current camera position forzados antes del rest?
  setBacktoWelcome: () => set(state => ({ currentExperience: null, currentScreen: "welcome" })),
  screensContainers: {},
  addScreenContainer: (name, container) => set(state => ({ screensContainers: { ...state.screensContainers, [name]: container } })),
  currentCameraPosition: "welcome",
  setCurrentCameraPosition: position => set(state => ({ currentCameraPosition: position })),
  currentCameraMode: "rig",
  setCurrentCameraMode: mode => set(state => ({ currentCameraMode: mode })),
  currentHoveredScreen: null,
  setCurrentHoveredScreen: screen => set(state => ({ currentHoveredScreen: screen })),
  createDOControls: null,
  setCreateDOControls: func => set(state => ({ createDOControls: func })),
  isMobile:
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
      ? true
      : false,
}));

export default useAppStore;
