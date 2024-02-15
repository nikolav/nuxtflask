import {
  Chart,
  Colors,
  // Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import assign from "lodash/assign";

// setup treeshaking
Chart.register(
  // Title,
  Colors,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// defaults
assign(Chart.defaults, {
  animation: false,
  responsive: true,
});

// @defaults/font
assign(Chart.defaults.font, {
  family: "Open Sans",
  weight: "lighter",
  size: 10,
});

// @defaults/elements
// Chart.defaults.elements.point
// Chart.defaults.elements.line
assign(Chart.defaults.elements.line, {
  borderCapStyle: "round",
  borderJoinStyle: "round",
});
// Chart.defaults.elements.bar
// Chart.defaults.elements.arc

export default defineNuxtPlugin(() => {});
