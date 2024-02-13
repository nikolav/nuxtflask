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
  font: {
    family: "Open Sans",
    weight: "lighter",
    size: 10,
  },
});

export default defineNuxtPlugin(() => {});
