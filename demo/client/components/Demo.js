import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Button from '@mui/material/Button';

const Demo = () => {
    const [queryData, setQueryData] = useState([]);
    const [queryResult, setQueryResult] = useState('');
    const [queryString, setQueryString] = useState(`{ cities  { id  name population country_id } }`);
    const [queryTime, setQueryTime] = useState(0);
    const [queryTimeArray, setQueryTimeArray] = useState([]);
    
    const [chartData, setChartData] = useState({
        labels: [1, 2, 3],
        datasets : [{
            label: 'Query Time in Milliseconds',
            data: queryTimeArray,
            backgroundColor: ['blue'],
            borderColor: "black",
            borderWidth: 2,
        }]

    });

    useEffect(() => {
        let arr = [];
        setChartData({
            labels: queryTimeArray.map((data, i) => {
                return i === 0 ? 'Uncached query time' : `Cached query ${i}`;
            }),
        datasets : [{
            label: 'Query Time in Milliseconds',
            data: queryTimeArray,
            backgroundColor: ['blue'],
            borderColor: "black",
            borderWidth: 2,
        }]
        })
    }, [queryTimeArray]);

    const fetchData = async () => {
        const startTime = performance.now();
        console.log(queryString);
        await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            query: queryString,
        }),
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const endTime = (performance.now() - startTime).toFixed(2);
        setQueryTime(endTime);
        setQueryTimeArray([...queryTimeArray, endTime]);
        setQueryData(data.data.cities)
        //console.log(JSON.stringify(data, null, 2));
        setQueryResult(JSON.stringify(data, null, 2))
        
    })
    }

    const displayData = () => {
        return queryData.map((item, i) => {
            return <div key={i}>{JSON.stringify(item)}</div>
        })
    }
    const displayQueryTimeArray = () => {
        return queryTimeArray.map((item, i) => {
            return <div key={i}>{item}</div>
        })
    }

    const handleQuery = () => {
        fetchData();
    }



    return (
        <div>
          <Button variant='contained' size='medium' id='queryButton' onClick={handleQuery} >Run Query</Button>
          <div>
            Query Time Array
            {displayQueryTimeArray()}
          </div>
          <h1>Uncached Time: {queryTimeArray[0] ? queryTimeArray[0] : 0 }ms</h1>
          <h1>Cached Time: {queryTime}ms</h1>
          <div id='queryString'> 
            <h2>Query String</h2>
            {queryString}
          </div>
          <div className='queryResult'>
            <h2>Query Result</h2>
            {queryResult}
          </div>
          <div className='displayData'>
            <h2>Display Data</h2>
            {displayData()}
          </div>
          <div className="barChartContainer">
            <BarChart chartData={chartData} />
          </div>
            
        </div>
    )
}

export default Demo;
