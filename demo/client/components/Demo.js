import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import QueueVisualizer from './QueueVisualizer';
import TextQuery from './TextQuery';
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

  const [loading, setLoading] = useState(false);

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
      setClientSideTime((performance.now() - startTime).toFixed(2));
      console.log('DATA', data);
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

        setQueryTimeArray([
          ...queryTimeArray,
          { latency: endTime, cached: data.cached },
        ]); // updates data points for charts
        setQueryResult(JSON.stringify(data.data, null, 2));
        setLoading(false);
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
    setLoading(true);
    fetchData();
  };

  const handleUploadAndQuery = () => {
    console.log('querying from text query field');
    setQueryString(`{ clients { id name email phone } }`);
    setLoading(true);
    fetchData();
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

              <button className='queryButton' onClick={handleQuery} disabled={loading}>
                Run Query
              </button>
            </div>
          </div>
        </div>
        <TextQuery handleUploadAndQuery={handleUploadAndQuery} loading={loading}/>
      </div>


      <div className='Visualizers'>
        <div className='visualizersDiv'>
          <div class='loadingDiv'>
            { loading && <div>
                <button disabled type="button" class="py-2.5 px-5 mr-2 text-lg font-large text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    </svg>
                    Loading...
                </button>
              </div> 
            }
          </div>

          <div className='barChart'>
            <p className='barChartHeading'>
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
