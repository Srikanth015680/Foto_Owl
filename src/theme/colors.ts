export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  danger: string;
  success: string;
  overlay: string;
}

export const lightColors: ThemeColors = {
  background: "#F5F6FA",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  text: "#14171F",
  textMuted: "#6B7280",
  border: "#E4E6EB",
  primary: "#3D5AFE",
  primaryText: "#FFFFFF",
  danger: "#E11D48",
  success: "#16A34A",
  overlay: "rgba(15, 17, 26, 0.6)",
};

export const darkColors: ThemeColors = {
  background: "#0F1117",
  surface: "#171A23",
  card: "#1E222D",
  text: "#F2F3F7",
  textMuted: "#9CA3AF",
  border: "#2B303C",
  primary: "#6C81FF",
  primaryText: "#0F1117",
  danger: "#F87171",
  success: "#4ADE80",
  overlay: "rgba(0, 0, 0, 0.7)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
} as const;