import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

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
          <Typography variant='h3'>Uncached Time: {queryTimeArray[0] ? queryTimeArray[0] : 0 }ms </Typography>
          <Typography variant='h3'>Cached Time: {queryTime}ms</Typography>
          <div id='queryString'> 
            <h2>Query String</h2>
            {queryString}
          </div>
        
          <Grid container spacing={2}>
              <Grid item>
                <Container sx={{ pt: 5 }}>
                    <TextField 
                        id="outlined-multiline-static"
                        label="Query String"
                        multiline
                        rows={7}
                        defaultValue='{ 
                            cities { 
                                id 
                                name 
                                population
                                country_id } 
                        }'
                    />
                </Container>
              </Grid>
              
              <Grid item>
                <Typography variant='h2'>Query Result</Typography>
                  <Container sx={{ overflow: 'auto', height:300, width: 500, backgroundColor:'lightgray', display:'flex', justifyContent: 'flex-start' }} className='queryResult'>
                    <pre> {queryResult} </pre>
                  </Container>
              </Grid>
          </Grid>
        
          
          {/* { <div className='displayData'>
            <h2>Display Data</h2>
            {displayData()}
            </div> */}
          
          <Container maxWidth="sm" className="barChartContainer">
            <BarChart chartData={chartData} />
          </Container>
            
        </div>
    )
}

export default Demo;
//hey man check your discord DM
