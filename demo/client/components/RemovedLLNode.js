import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
//import '../styles/LLNode.css';

const RemovedLLNode = (props) => {
  return (
    <div style={{ border: 'red 2px solid', borderRadius: 10, padding: 3 }}>
      <div>
        {props.num === 0 ? <h2>None Evicted Yet</h2> : <h2>Last Evicted</h2>}
        <h3> {`Query ${props.num}`}</h3>
        <p className='latency'>{`${Math.floor(props.latency)}ms`} </p>
      </div>
    </div>
  );
};

export default RemovedLLNode;
