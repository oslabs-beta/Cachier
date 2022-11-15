import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
//import '../styles/LLNode.css';

const RemovedLLNode = (props) => {
  return (
    <div
      style={{
        border: 'black 3px solid',
        borderRadius: 10,
        padding: 3,
        backgroundColor: 'White',
      }}
    >
      <div>
        {props.num === 0 ? <h2>None Evicted Yet</h2> : <h2>Last Evicted</h2>}
        {props.num !== 0 && <h3> {`Query ${props.num}`}</h3>}
        {props.num !== 0 && (
          <p className='latency'>{`${Math.floor(props.latency)}ms`} </p>
        )}
      </div>
    </div>
  );
};

export default RemovedLLNode;
