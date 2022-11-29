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
    >
      <div className='EvictionHeading'
      >
        LRU-SLFR Eviction Policy Visualizer
      </div>
      <div className='queueContainerDiv'
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
