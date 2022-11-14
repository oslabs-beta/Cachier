import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LLNode from './LLNode';
import '../styles/QueueVisualizer.css';

const QueueVisualizer = (props) => {
  const { queue } = props;
  console.log(queue);

  const traverse = (list) => {
    let currNode = list.head;
    const output = [];
    let counter = 1;

    while (currNode) {
      output.push(<LLNode name={counter} key={currNode.key} node={currNode} />);
      currNode = currNode.next;
      counter++;
    }
    return output;
  };

  return (
    <div className='Eviction'>
      <h1>Eviction Policy Visualizer</h1>
      <div className='queueContainer'>{traverse(queue)}</div>
    </div>
  );
};

export default QueueVisualizer;
