import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend, Filler);

const RoundChart = ({ data }) => {
  // Dynamically determine the AQI level and color
  let aqiColor = '#4caf50'; // Default to Green for Good
  if (data.aqi > 300) {
    aqiColor = '#7e1f1f'; // Hazardous - Brown
  } else if (data.aqi > 200) {
    aqiColor = '#800080'; // Very Unhealthy - Purple
  } else if (data.aqi > 150) {
    aqiColor = '#f44336'; // Unhealthy - Red
  } else if (data.aqi > 100) {
    aqiColor = '#ff9800'; // Unhealthy for Sensitive Groups - Orange
  } else if (data.aqi > 50) {
    aqiColor = '#ffe066'; // Moderate - Yellow
  }

  const chartData = {
    labels: ['AQI Level'],
    datasets: [
      {
        label: `AQI in ${data.city}`,
        data: [data.aqi, 500 - data.aqi], // The second part is the remaining part to make the chart a full circle
        backgroundColor: [aqiColor, '#e0e0e0'], // Use dynamic color for AQI, and grey for the remaining portion
        hoverOffset: 4,
        borderWidth: 0, // No border to make it smooth
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
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
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  return (
    <div className="chart-container">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default RoundChart;
