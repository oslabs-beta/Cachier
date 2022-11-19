import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({chartData}) => {

    return (
        <Line data={chartData}/>
    )
}

export default LineChart;