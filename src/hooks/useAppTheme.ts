import { useThemeStore } from "../store/themeStore";
import {
  darkColors,
  lightColors,
  ThemeColors,
} from "../theme/colors";

export function useAppTheme() {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  const colors: ThemeColors =
    mode === "dark" ? darkColors : lightColors;

  return {
    colors,
    mode,
    toggleMode,
  };
}