import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';


const Docs = () => {

  return (
    <div>

      
      <h1>Install our package</h1>
      <div className="mockup-code">
        <pre data-prefix="$"><code>npm i @cachier/server-side</code></pre>
        <pre data-prefix="$"><code>npm i @cachier/client-side</code></pre>
        <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
      </div>

      <h1>Read our documentation below</h1>

      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure><img src="https://placeimg.com/400/225/arch" alt="Architecture" /></figure>
        <div className="card-body">
          <h2 className="card-title">What is caching?</h2>
          <p>An important concept in computer science and web development</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Read about it here</button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure><img src="https://placeimg.com/400/225/tech" alt="Tech" /></figure>
        <div className="card-body">
          <h2 className="card-title">What is GraphQL?</h2>
          <p>A database query language for more efficient and exact queries</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Read here</button>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure><img src="https://placeimg.com/400/225/tech" alt="Tech" /></figure>
        <div className="card-body">
          <h2 className="card-title">Why use our caching tool?</h2>
          <p>Get an understanding of what tooling Cachier provides.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Read here</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Docs;

