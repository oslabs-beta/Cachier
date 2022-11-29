import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import QueueVisualizer from './QueueVisualizer';
import '../styles/Demo.css';
import { clientSideCache } from '../../../clientSideCache';

const cachierFetch = clientSideCache(4, 2);

const Demo = () => {
  // const [queryData, setQueryData] = useState([]);
  const [clientSideTime, setClientSideTime] = useState(0);

  //state for the GraphQL query result once the fetch is down
  const [queryResult, setQueryResult] = useState('');

  //query string that is displayed in GraphQL format
  const [queryString, setQueryString] = useState('');

  //Array storing the linkedlist data use to display our linked list
  const [llData, setLLData] = useState([]);

  const [removedNode, setRemovedNode] = useState({ num: 0, latency: 0 });
  const [currGroupSize, setCurrGroupSize] = useState(0);

  const [queryGraphQLString, setQueryGraphQLString] = useState(
    '{ clients { id name email phone } }'
  );
  const [queryTime, setQueryTime] = useState(0);
  const [queryTimeArray, setQueryTimeArray] = useState([
    { latency: 0, cached: false },
  ]);

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
        data: queryTimeArray.latency,
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

  const chartLatency = () => {
    let latencyArray = queryTimeArray.map((el) => el.latency);
    let result = latencyArray.slice(1);
    return result;
  };

  useEffect(() => {
    let arr = [];

    setChartData({
      labels: queryTimeArray
        .map((data, i) => {
          return !data.cached ? 'Uncached Query' : `Cached Query`;
        })
        .slice(1),
      datasets: [
        {
          axis: 'y',
          label: 'Query Time in Milliseconds',
          data: chartLatency(),
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
    cachierFetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: queryGraphQLString,
      }),
    }).then((data) => {
      console.log('DATA', data);
      setClientSideTime((performance.now() - startTime).toFixed(2));
    });

    fetch('http://localhost:3000/cacheMoney', {
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
        const endTime = (performance.now() - startTime).toFixed(2); // records end time for front-end latency measure
        setLLData(data.queue); // updates state linked list object
        if (data.removedNode) {
          setRemovedNode(data.removedNode);
        }
        setCurrGroupSize(data.currGroupSize);
        setQueryTime(endTime);
        //setQueryTime(data.latency.toFixed(2));

        setQueryTimeArray([
          ...queryTimeArray,
          { latency: endTime, cached: data.cached },
        ]); // updates data points for charts
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
      return <div key={i}>{item.latency}</div>;
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

  // const elem = document.getElementById('canvas1');
  // elem.remove();

  return (
    <div className='demoDiv'>
      <div className='demoLeftContainer'>
        <div className='query'>
          <div className='padding0'>
            <div className='queryResultContainer'>
              <p className='queryResultHeading'>Query Result</p>
              <div className='queryResult'>
                <pre className='code'> {queryResult} </pre>
              </div>
              <div className='queryResultMetrics'>
                <span className='serverSide'>Server Side:</span>
                <span className='metrics'>
                  {queryTime}
                  <span className='ms'>ms</span>
                </span>
              </div>
              <div className='queryResultMetricsDiv'>
                <span className='serverSide'>Client Side:</span>
                <span className='metrics'>
                  {clientSideTime}
                  <span className='ms'>ms</span>
                </span>
              </div>

              <div className='cacheHitDiv'>
                <span className='serverSide'>Cache Hit:</span>
                <span
                  className='cacheHitMetric'
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 25,
                    color: '#ff4c4c',
                    paddingRight: '1.5vw',
                  }}
                >
                  {queryTimeArray[queryTimeArray.length - 1].cached
                    ? 'Hit'
                    : 'Miss'}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className='queryContainer'>
              <div className='queryString'>
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
                <label htmlFor='clients'> Clients</label>
                <div>
                  {clientChecked === true && (
                    <div className='clientFields'>
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
                      <label htmlFor='clientId'> ID</label>
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
                      <label htmlFor='clientName'> Name</label>
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
                      <label htmlFor='clientEmail'> Email</label>
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
                      <label htmlFor='clientPhone'> Phone</label>
                    </div>
                  )}
                </div>
              </div>
              <div className='queryDisplayStringContainer'>
                <p className='testQuery'> {testQuery()} </p>
              </div>

              <button className='queryButton' onClick={handleQuery}>
                Run Query
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='Visualizers'>
        <div className='visualizersDiv'>
          <div className='barChart'>
            <p
              style={{
                fontFamily: 'Georgia, serif',
                textAlign: 'center',
                fontSize: '2vw',
                margin: '.7vw',
              }}
            >
              {' '}
              Query Cache Performance Chart{' '}
            </p>
            <div className='barChartContainer'>
              <BarChart chartData={chartData} />
            </div>
          </div>
        </div>
        <QueueVisualizer
          queue={llData}
          removedNode={removedNode}
          currGroupSize={currGroupSize}
        />
      </div>
    </div>
  );
};

export default Demo;
