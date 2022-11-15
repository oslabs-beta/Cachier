import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom';
import QueueVisualizer from './QueueVisualizer';
import '../styles/Demo.scss';

const Demo = () => {
  // const [queryData, setQueryData] = useState([]);
  const [queryResult, setQueryResult] = useState('');
  const [queryString, setQueryString] = useState('');
  const [llData, setLLData] = useState([]);
  const [removedNode, setRemovedNode] = useState({ num: 0, latency: 0 });
  const [currGroupSize, setCurrGroupSize] = useState(2);

  const [queryGraphQLString, setQueryGraphQLString] = useState(
    '{ clients { id name email phone } }'
  );
  const [queryTime, setQueryTime] = useState(0);
  const [queryTimeArray, setQueryTimeArray] = useState([]);

  const [clientChecked, setClientChecked] = useState(false);
  const [clientIdChecked, setClientIdChecked] = useState(true);
  const [clientNameChecked, setClientNameChecked] = useState(true);
  const [clientEmailChecked, setClientEmailChecked] = useState(true);
  const [clientPhoneChecked, setClientPhoneChecked] = useState(true);

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
    },
  });

  useEffect(() => {
    const string = `{ clients { ${clientIdChecked ? 'id' : ''}${
      clientNameChecked ? ' name' : ''
    }${clientEmailChecked ? ' email' : ''}${
      clientPhoneChecked ? ' phone' : ''
    } } }`;
    //string.replaceAll("  ", " ");
    setQueryGraphQLString(string);
  }, [
    clientChecked,
    clientIdChecked,
    clientNameChecked,
    clientEmailChecked,
    clientPhoneChecked,
  ]);

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
            'rgba(201, 203, 207, 0.2)',
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
    console.log(queryGraphQLString);
    await fetch('http://localhost:3000/cacheMoney', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: queryGraphQLString,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const endTime = (performance.now() - startTime).toFixed(2); // records end time for front-end latency measure
        setLLData(data.queue); // updates state linked list object
        if (data.removedNode) {
          setRemovedNode(data.removedNode);
        } else {
          setRemovedNode({ num: 0, latency: 0 });
        }
        setCurrGroupSize(data.currGroupSize);
        setQueryTime(endTime);
        setQueryTimeArray([...queryTimeArray, endTime]); // updates data points for charts
        setQueryResult(JSON.stringify(data.data, null, 2));
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

  const handleUpload = () => {
    setQueryString(`{ clients { id name email phone } }`);
  };

  const testQuery = () => {
    if (clientChecked) {
      return (
        <div>
          <p style={{ margin: 0, paddingTop: 20 }}>&#123;</p>
          <span>&nbsp;&nbsp;clients &#123;</span>
          {clientIdChecked && (
            <p style={{ margin: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;id</p>
          )}
          {clientNameChecked && (
            <p style={{ margin: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;name</p>
          )}
          {clientEmailChecked && (
            <p style={{ margin: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;email</p>
          )}
          {clientPhoneChecked && (
            <p style={{ margin: 0 }}>&nbsp;&nbsp;&nbsp;&nbsp;phone</p>
          )}
          <p style={{ margin: 0 }}>&nbsp;&nbsp; &#125;</p>
          <p style={{ margin: 0 }}>&#125;</p>
        </div>
      );
    }
  };

  return (
    <div className='demoDiv'>
      <h2>{queryGraphQLString}</h2>
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
              <input
                type='checkbox'
                onChange={() =>
                  clientChecked
                    ? setClientChecked(false)
                    : setClientChecked(true)
                }
                id='clients'
                name='clients'
                value='clients'
              />
              <label for='clients'> Clients</label>
              <Container>
                {clientChecked === true && (
                  <div>
                    <input
                      type='checkbox'
                      onChange={() =>
                        clientIdChecked
                          ? setClientIdChecked(false)
                          : setClientIdChecked(true)
                      }
                      checked={clientIdChecked}
                      id='clients'
                      name='clientId'
                      value='clientId'
                    />
                    <label for='clientId'> ID</label>
                    <input
                      type='checkbox'
                      onChange={() =>
                        clientNameChecked
                          ? setClientNameChecked(false)
                          : setClientNameChecked(true)
                      }
                      checked={clientNameChecked}
                      id='clientName'
                      name='clientName'
                      value='clientName'
                    />
                    <label for='clientName'> Name</label>
                    <input
                      type='checkbox'
                      onChange={() =>
                        clientEmailChecked
                          ? setClientEmailChecked(false)
                          : setClientEmailChecked(true)
                      }
                      checked={clientEmailChecked}
                      id='clientEmail'
                      name='clientEmail'
                      value='clientEmail'
                    />
                    <label for='clientEmail'> Email</label>
                    <input
                      type='checkbox'
                      onChange={() =>
                        clientPhoneChecked
                          ? setClientPhoneChecked(false)
                          : setClientPhoneChecked(true)
                      }
                      checked={clientPhoneChecked}
                      id='clientPhone'
                      name='clientPhone'
                      value='clientPhone'
                    />
                    <label for='clientPhone'> Phone</label>
                  </div>
                )}
              </Container>
            </Container>
            <Container
              sx={{
                overflow: 'auto',
                height: 300,
                width: 500,
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'flex-start',
                borderRadius: 5,
                border: '2px solid black',
                color: '#9C528B',
              }}
              className='queryStringContainer'
            >
              {testQuery()}
              <p> {queryString} </p>
            </Container>
            {/* <Button
              variant='contained'
              color='info'
              size='medium'
              id='uploadButton'
              onClick={handleUpload}
            >
              Upload Query
            </Button> */}
            <Button
              variant='contained'
              color='success'
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
      <QueueVisualizer
        queue={llData}
        removedNode={removedNode}
        currGroupSize={currGroupSize}
      />
    </div>
  );
};

export default Demo;
