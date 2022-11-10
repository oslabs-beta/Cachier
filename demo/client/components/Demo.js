import React, { useState, useEffect } from 'react';

const Demo = () => {
    const [queryData, setQueryData] = useState([]);
    const [queryString, setQueryString] = useState(`{ cities  { id  name population country_id } }`);
    const [queryTime, setQueryTime] = useState(0);

    useEffect(() => {
        console.log("start")
        async function fetchData () {
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
            setQueryData(data.data.cities)
            //setQueryData(JSON.stringify(data, null, 2));
            
        })
        }
        
        fetchData();
    }, []);

    const displayData = () => {
        return queryData.map((item, i) => {
            return <div key={i}>{JSON.stringify(item)}</div>
        })
    }



    return (
        <div>
          <h1>Fetch Time: {queryTime}</h1>
          <div className="displayData">
            {displayData()}
          </div>
            
        </div>
    )
}

export default Demo;
