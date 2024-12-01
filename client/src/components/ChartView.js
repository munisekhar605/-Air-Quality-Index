import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './ChartView.css'; // Import the CSS file

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const ChartView = ({ data }) => {
  const chartData = {
    labels: ['Air Quality Index (AQI)'],
    datasets: [
      {
        label: `AQI in ${data.city}`,
        data: [data.aqi],
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvas, chartArea } = chart;

          if (!chartArea) return '#ccc'; // Fallback color

          const gradient = canvas.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

          // Apply color stops based on AQI value
          if (data.aqi <= 50) {
            gradient.addColorStop(0, '#4caf50'); // Green for Good
            gradient.addColorStop(1, '#4caf50');
          } else if (data.aqi <= 100) {
            gradient.addColorStop(0, '#ffe066'); // Yellow for Moderate
            gradient.addColorStop(1, '#ffe066');
          } else if (data.aqi <= 150) {
            gradient.addColorStop(0, '#ff9800'); // Orange for Unhealthy for Sensitive Groups
            gradient.addColorStop(1, '#ff9800');
          } else if (data.aqi <= 200) {
            gradient.addColorStop(0, '#f44336'); // Red for Unhealthy
            gradient.addColorStop(1, '#f44336');
          } else if (data.aqi <= 300) {
            gradient.addColorStop(0, '#800080'); // Purple for Very Unhealthy
            gradient.addColorStop(1, '#800080');
          } else {
            gradient.addColorStop(0, '#000000'); // Black for Hazardous
            gradient.addColorStop(1, '#000000');
          }

          return gradient;
        },
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 15,
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: `Detailed AQI Analysis for ${data.city}`,
        color: '#000',
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const category =
              value > 300
                ? 'Hazardous'
                : value > 200
                ? 'Very Unhealthy'
                : value > 150
                ? 'Unhealthy'
                : value > 100
                ? 'Unhealthy for Sensitive Groups'
                : value > 50
                ? 'Moderate'
                : 'Good';
            return `AQI: ${value} (${category})`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(300, data.aqi + 50),
        ticks: {
          stepSize: 50,
          color: '#333',
          font: {
            size: 14,
          },
        },
        grid: {
          color: '#ddd',
          borderDash: [5, 5],
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartView;
