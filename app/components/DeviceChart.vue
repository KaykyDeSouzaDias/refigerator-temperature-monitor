<script setup lang="ts">
import * as Chart from "chart.js";
import type { IDevice } from "~/models";

// Register Chart.js components
Chart.Chart.register(
  Chart.LineController,
  Chart.LineElement,
  Chart.PointElement,
  Chart.LinearScale,
  Chart.CategoryScale,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler
);

const props = defineProps<{
  isVisible: boolean;
  canInit: boolean;
  currentDevice: IDevice;
  groupedDevices: IDevice[][];
}>();

const chartInstances = ref<Record<string, Chart.Chart | undefined>>({});

watch(
  () => props.canInit,
  (newVal) => {
    if (newVal) createChart();
  },
  {
    immediate: true,
  }
);

function createChart() {
  const code = props.currentDevice.field3;
  const deviceData = props.groupedDevices.find(
    (group: IDevice[]) => group[0]?.field3 === code
  );

  if (!deviceData || deviceData.length === 0) return;

  const canvas = document.getElementById(
    `chart-${code}`
  ) as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Destroy existing graphs
  if (chartInstances.value[code]) {
    chartInstances.value[code].destroy();
  }

  const times = deviceData.map((d: IDevice) =>
    new Date(d.created_at).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const temperatures = deviceData.map((d: IDevice) => d.field5);
  const targetTemp = deviceData[0]?.field6 ?? 0;
  const margin = deviceData[0]?.field7 ?? 0;

  chartInstances.value[code] = new Chart.Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "Temperatura Atual",
          data: temperatures,
          borderColor: "#14b8a6",
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Temperatura Ideal",
          data: Array(times.length).fill(targetTemp),
          borderColor: "#10b981",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
        },
        {
          label: "Margem Superior",
          data: Array(times.length).fill(margin),
          borderColor: "#f59e0b",
          borderWidth: 1,
          borderDash: [2, 2],
          fill: false,
          pointRadius: 0,
        },
        {
          label: "Margem Inferior",
          data: Array(times.length).fill(margin),
          borderColor: "#f59e0b",
          borderWidth: 1,
          borderDash: [2, 2],
          fill: false,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.parsed.y + "°C";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) {
              return value + "°C";
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
    },
  });
}
</script>

<template>
  <div v-if="props.isVisible" style="height: 300px; position: relative">
    <canvas :id="`chart-${props.currentDevice.field3}`"></canvas>
  </div>
  <v-empty-state
    v-else
    icon="mdi-chart-bell-curve-cumulative"
    text="Tente gerar novamente ou entre em contato com o seu administrador."
    title="Gráfico não encontrado"
  />
</template>
