import React from 'react';
import Chart from 'react-apexcharts';

interface DonutChartProps {
  darkMode: boolean;
}
const DonutChart: React.FC<DonutChartProps> = ({ darkMode }) => {

  // Donut chart options
  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Desktop", "Tablet", "Mobile"],
    colors: ["#FF5733", "#33FF57", "#3357FF"],
    legend: {
      show: false, // Hide the legend
    },
    dataLabels: {
      style: {
        colors: ["#dddddd"],
      },
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const series = [44, 55, 41];

  return (
    <div className='py-6 bg-white rounded-lg p-5 flex dark:bg-gray-600 items-center justify-center'>
      {/* <Chart options={options} series={series} type='donut' height={350} /> */}
    </div>
  );
}

export default DonutChart;
