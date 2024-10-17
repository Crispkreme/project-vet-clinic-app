import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 

interface DonutChartProps {
  darkMode: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({ darkMode }) => {
  
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: ["Desktop", "Tablet", "Mobile"],
    colors: ["#FF5733", "#33FF57", "#3357FF"],
    legend: {
      position: "bottom",
      labels: {
        colors: darkMode ? "#dddddd" : "#000000",
      },
    },
    dataLabels: {
      style: {
        colors: ["#dddddd"],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [44, 55, 41];
  
  return (
    <div className='py-6 bg-white rounded-lg p-5 flex dark:bg-gray-600 items-center justify-center'>
      <Chart options={options} series={series} type='donut' height={200} />
    </div>
  );
}

export default DonutChart;
