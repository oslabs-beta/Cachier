import React, { useState, useEffect } from 'react';

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
            data: queryTimeArray.map((data) => data)
        }]

    });

    useEffect(() => {
        // console.log("start")
        // fetchData();
    }, []);

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
        const endTime = performance.now() - startTime;
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
          <button id='queryButton' onClick={handleQuery}>Run Query</button>
          <div>
            Query Time Array
            {displayQueryTimeArray()}
          </div>
          <h1>Fetch Time: {queryTime}</h1>
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
            
        </div>
    )
}

export default Demo;
