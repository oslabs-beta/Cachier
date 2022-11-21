import React from 'react';
import LLNode from './LLNode';
import '../styles/QueueVisualizer.css';
import RemovedLLNode from './RemovedLLNode';

const QueueVisualizer = (props) => {
  const { queue } = props;

  const traverse = (list) => {
    let count = 4 - props.currGroupSize;
    const output = [];
    let index = 0;
    while (index < list.length) {
      if (index < count) {
        output.push(
          <LLNode
            key={list[index].key}
            num={list[index].num}
            latency={list[index].latency}
            color='white'
          />
        );
      } else {
        output.push(
          <LLNode
            key={list[index].key}
            num={list[index].num}
            latency={list[index].latency}
            color='red'
          />
        );
      }
      index++;
    }
    return output;
  };

  return (
    <div
      className='Eviction'
      style={{
        marginTop: '2vw',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: '1vw',
        color: 'black',
        boxShadow: 24,
      }}
    >
      <div
        style={{
          fontFamily: 'Georgia, serif',
          padding: 2,
          fontSize: '2vw',
          color: 'white',
        }}
      >
        LRU-SLFR Eviction Policy Visualizer
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '1.5vw',
        }}
      >
        <div className='queueContainer'>{traverse(queue)}</div>
        <div className='Evicted'>
          <h2 className='evictedText'>Last Evicted</h2>
          {props.removedNode && (
            <RemovedLLNode
              num={props.removedNode.num}
              latency={props.removedNode.latency}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
