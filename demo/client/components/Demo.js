import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom';


const Demo = () => {
  const [queryData, setQueryData] = useState([]);
  const [queryResult, setQueryResult] = useState('');
  const [queryString, setQueryString] = useState(
    `{ cities  { id  name population country_id } }`
  );
  const [queryTime, setQueryTime] = useState(0);
  const [queryTimeArray, setQueryTimeArray] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Query Time in Milliseconds',
        data: queryTimeArray,
        backgroundColor: ['blue'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
    options: {
    indexAxis: 'y',
  }
  });

  useEffect(() => {
    let arr = [];
    setChartData({
      labels: queryTimeArray.map((data, i) => {
        return i === 0 ? 'Uncached query time' : `Cached query ${i}`;
      }),
      datasets: [
        {
          axis: 'y',
          label: 'Query Time in Milliseconds',
          data: queryTimeArray,
          fill: true,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          //backgroundColor: ['blue'],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    });
  }, [queryTimeArray]);

  const fetchData = async () => {
    const startTime = performance.now();
    console.log(queryString);
    await fetch('http://localhost:3000/cacheMoney', {
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
        setQueryData(data.data.cities);
        //console.log(JSON.stringify(data, null, 2));
        setQueryResult(JSON.stringify(data, null, 2));
      });
  };

  const displayData = () => {
    return queryData.map((item, i) => {
      return <div key={i}>{JSON.stringify(item)}</div>;
    });
  };
  const displayQueryTimeArray = () => {
    return queryTimeArray.map((item, i) => {
      return <div key={i}>{item}</div>;
    });
  };

  const handleQuery = () => {
    fetchData();
  };

  return (

    <div>

      {
        //   <Typography variant='h4'>
        //     Query Time Array
        //     {displayQueryTimeArray()}
        //   </Typography>
      }

      <Grid container spacing={5} alignItems='center' justifyContent='center'>
        <Grid item>
          <Box display='flex' flexDirection='column' sx={{ gap: 3 }}>
            <Container id='queryString'>
              <h2>Query String</h2>
              {queryString}
            </Container>
            <Container sx={{ pt: 5 }}>
              <TextField
                id='outlined-multiline-static'
                label='Query String'
                style={{ width: 400 }}
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
            <Button
              variant='contained'
              size='medium'
              id='queryButton'
              onClick={handleQuery}
            >
              Run Query
            </Button>
          </Box>
        </Grid>

        <Grid item>
          <Typography variant='h2'>Query Result</Typography>
          <Container
            sx={{
              overflow: 'auto',
              height: 300,
              width: 500,
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'flex-start',
              borderRadius: 5,
            }}
            className='queryResult'
          >
            <pre style={{ fontWeight: 700, color: 'white', fontSize: 18 }}>
              {' '}
              {queryResult}{' '}
            </pre>
          </Container>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems='center'
        justifyContent='center'
        flex
        sx={{ pt: 5 }}
      >
        <Grid item>
          <Box justifyContent='center' sx={{ width: 500 }}>
            <Typography variant='h4'>
              Uncached Time: {queryTimeArray[0] ? queryTimeArray[0] : 0}ms{' '}
            </Typography>
            <Typography variant='h4'>Cached Time: {queryTime}ms</Typography>
          </Box>
        </Grid>

        <Grid item sx={{ width: 700 }}>
          <Box className='barChartContainer' justifyContent='center'>
            <BarChart style={{ width: 600 }} chartData={chartData} />
          </Box>
        </Grid>

        <Grid item sx={{ width: 700 }}>
          <Box className='lineChartContainer' justifyContent='center'>
            <LineChart style={{ width: 600 }} chartData={chartData} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Demo;
