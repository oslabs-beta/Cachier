import React, { useState, useEffect } from 'react';
import '../styles/Demo.css';

const TextQuery = () => {

    const string = `{ clients { id name email phone } }`;
    function handleTextQuery(){
        console.log('TextQueryBtn clicked');
    }


    return (
        <div className='queryTextInput'>
            <div className="form-control">
                <label className="queryTextInputField">
                    <span className="label-text">Type Query here</span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="
{
clients {      
id
name
email
phone
}
}
"></textarea>
                <label className="label">
                    <span className="label-text-alt">Type a GraphQL query as you would in your code. Can handle only queries for now, no mutations.</span>
                    <span className="label-text-alt">Alt label</span>
                </label>
            </div>
            <button className='queryButton' onClick={handleTextQuery}>
                Run Query
            </button>
        </div>
    );
}

export default TextQuery;