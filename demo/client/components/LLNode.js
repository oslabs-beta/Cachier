import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/LLNode.css';

const LLNode = (props) => {
  const node = props.node;

  return (
    <div className='link'>
      <div className='node'>
        <h1> {`Query ${node.num}`}</h1>
        <p className='latency'>{`${Math.floor(node.latency)}ms`} </p>
      </div>
      <img className='arrow' src='../styles/arrow.png' />
    </div>
  );
};

export default LLNode;
