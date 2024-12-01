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
} from 'chart.js';
import './ChartView.css'; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DaysChart = ({ data }) => {
  // Ensure the data exists before proceeding
  if (!data || !data.o3 || !data.pm10 || !data.pm25 || !data.uvi) {
    return <div>Loading...</div>; // Show loading state if any data is missing
  }

  const labels = data.o3.slice(0, 7).map((item) => item.day); // Days from the data

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ozone (O3)',
        data: data.o3.slice(0, 7).map((item) => item.avg),
        backgroundColor: '#ffb74d',
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 10,
      },
      {
        label: 'PM10',
        data: data.pm10.slice(0, 7).map((item) => item.avg),
        backgroundColor: '#4caf50',
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 10,
      },
      {
        label: 'PM2.5',
        data: data.pm25.slice(0, 7).map((item) => item.avg),
        backgroundColor: '#f44336',
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 10,
      },
      {
        label: 'UV Index',
        data: data.uvi.slice(0, 7).map((item) => item.avg),
        backgroundColor: '#2196f3',
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 10,
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
      },
      title: {
        display: true,
        text: `Pollutant and UV Index Analysis`,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(
          ...data.o3.slice(0, 7).map((item) => item.avg),
          ...data.pm10.slice(0, 7).map((item) => item.avg),
          ...data.pm25.slice(0, 7).map((item) => item.avg),
          ...data.uvi.slice(0, 7).map((item) => item.avg)
        ) + 10,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div className="chart-container width80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DaysChart;
