import React, { useState, useEffect } from 'react';

const Demo = () => {
    const [queryData, setQueryData] = useState([]);
    const [queryString, setQueryString] = useState(`{ cities  { id  name population country_id } }`);

    useEffect(() => {
        console.log("start")
        async function fetchData () {
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
            console.log(data.data.cities);
            setQueryData(data.data.cities)
            //setQueryData(JSON.stringify(data, null, 2));
            
        })
        }
        
        fetchData();
    }, []);

    const displayData = () => {
        return queryData.map(item => {
            return <div key="{item}">{JSON.stringify(item)}</div>
        })
    }



    return (
        <div>
            {displayData()}
        </div>
    )
}

export default Demo;
