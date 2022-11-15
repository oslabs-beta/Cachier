import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LLNode from './LLNode';
import '../styles/QueueVisualizer.css';
import RemovedLLNode from './RemovedLLNode';

const QueueVisualizer = (props) => {
  const { queue } = props;

  console.log(props.currGroupSize);

  const traverse = (list) => {
    let count = 4 - props.currGroupSize;
    const output = [];
    let index = 0;
    while (index < list.length) {
      console.log('count', count);
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
    <div className='Eviction'>
      <h1>Eviction Policy Visualizer</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className='queueContainer'>{traverse(queue)}</div>

        {props.removedNode && (
          <RemovedLLNode
            num={props.removedNode.num}
            latency={props.removedNode.latency}
          />
        )}
      </div>
    </div>
  );
};

export default QueueVisualizer;
