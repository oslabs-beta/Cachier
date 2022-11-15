import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/LLNode.css';

const LLNode = (props) => {
  return (
    <div className='link'>
      <div className='node' style={{ backgroundColor: `${props.color}` }}>
        <h1> {`Query ${props.num}`}</h1>
        <p className='latency'>{`${Math.floor(props.latency)}ms`} </p>
      </div>
      <img className='arrow' src='../styles/arrow.png' />
    </div>
  );
};

export default LLNode;
