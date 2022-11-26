import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/LLNode.css';

const LLNode = (props) => {
  return (
    <div className='link'>
      <div className='node' style={{ backgroundColor: `${props.color}` }}>
        <h1> {`Query ${props.num}`}</h1>
        <div className='latency'>{`${Math.floor(props.latency)}ms`} </div>
      </div>
      <div className='arrowDiv'>
        <img
          style={{ width: '2vw', height: '1vw' }}
          className='arrow'
          src='../styles/arrow.png'
        />
      </div>
    </div>
  );
};

export default LLNode;
