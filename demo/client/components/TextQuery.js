import React, { useState, useEffect } from 'react';
import '../styles/Demo.css';

const TextQuery = (props) => {

    const { handleUploadAndQuery, loading } = props;
    const string = `{ clients { id name email phone } }`;
    function handleClick(){
        const str = document.getElementsByClassName('textarea textarea-bordered h-24')[0].value;
        console.log('text field: ', str);
        handleUploadAndQuery();
    }


    return (
        <div className='queryTextInput'>
            <div className="form-control">
                <label className="queryTextInputField">
                    <span className="label-text">Type Query here</span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="{
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
                </label>
            </div>
            <button className='queryButton' onClick={handleClick}>
                Run Query
            </button>
        </div>
    );
}

export default TextQuery;