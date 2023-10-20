import { create } from "zustand";
import { screensData } from "./data/screensData";

const useAppStore = create((set, get) => ({
  currentScreen: "menu",
  setScreen: screen => set(state => ({ currentScreen: screen })),
  currentExperience: null,
  setBacktoMenu: () => set(state => ({ currentExperience: null, currentScreen: "menu", currentCameraPosition: "menu" })),
  setExperience: experience => set(state => ({ currentExperience: experience, currentScreen: "experience" })),
  getCurrentExperienceData: () =>
    screensData.find(screen => {
      return screen.name === get().currentExperience;
    }),
  currentCameraPosition: "menu",
  setCurrentCameraPosition: position => set(state => ({ currentCameraPosition: position })),
  currentCameraMode: "rig",
  setCurrentCameraMode: mode => set(state => ({ currentCameraMode: mode })),
}));

export default useAppStore;
