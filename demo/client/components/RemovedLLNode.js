import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
//import '../styles/LLNode.css';

const RemovedLLNode = (props) => {
  return (
    <div className='LastEvictedBox'>
      <div className='node' style={{ backgroundColor: '#ffd240' }}>
        {props.num !== 0 ? <h1> {`Query ${props.num}`}</h1> : <h1>Query</h1>}
        {props.num !== 0 ? (
          <p className='latency'>{`${Math.floor(props.latency)}ms`} </p>
        ) : (
          <p className='latency'>null</p>
        )}
      </div>
    </div>
  );
};

export default RemovedLLNode;
