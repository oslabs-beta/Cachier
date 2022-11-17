import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
//import SearchIcon from '@material-ui/icons/Search';

const BarChart = ({chartData}) => {
    const options = {indexAxis: 'y'}

    return (
        <Bar data={chartData} options={options} />
    )
}

export default BarChart;