import { type ThemeDefinition } from "vuetify";
import chroma from "chroma-js";
import { THEME_ACCENT_SHIFT } from "@/config";

// primary => accent1, accent2, complement
const primary = "#37474F";
const pHsl = chroma(primary).hsl();
const hueShift = (amount: number) => (n: number, i: number) =>
  0 !== i ? n : n + amount;
const hueShift1 = hueShift(THEME_ACCENT_SHIFT);
const hueShift2 = hueShift(-THEME_ACCENT_SHIFT);
const hueShiftCompl = hueShift(-180);

const nAccent1 = pHsl.map(hueShift1);
const accent1 = chroma.hsl(nAccent1[0], nAccent1[1], nAccent1[2]).hex();

const nAccent2 = pHsl.map(hueShift2);
const accent2 = chroma.hsl(nAccent2[0], nAccent2[1], nAccent2[2]).hex();

const nCompl = pHsl.map(hueShiftCompl);
const complement = chroma.hsl(nCompl[0], nCompl[1], nCompl[2]).hex();

export const light2: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary,
    secondary: "#e2e2e2",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    //
    accent1,
    accent2,
    complement,
  },
};
