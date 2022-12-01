import e from "cors";
import React from "react";
import '../styles/Demo.css';

const Selector = (props) => {

    const handleListClick = (e) => {
        const gqlEndpoint = e.target.value;
        console.log(gqlEndpoint);
    }

    const handleEnterClick = () => {
        // const x = document.getElementById('uriInput').value;
        console.log('Enter button clicked');
    }

    return (
        <div className="navbar bg-base-300 rounded-box">
            <div className="flex-1 px-2 lg:flex-none">
                <a className="text-lg font-bold">Enter URI</a>
                {/* <input type={text} className='uriInput'></input> */}
                
            </div>
            <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost rounded-btn">Select a public API</label>
                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            {/* <li><a href="https://rickandmortyapi.com/graphql"></a>Rick&Morty</li> */}
                            <li><a value="https://anilist.co/graphiql" onClick={handleListClick}>Anime</a></li>
                            {/* <li><a href="https://demotivation-quotes-api.herokuapp.com/graphql"></a>Demotivational Quotes</li> */}
                            <li><a value="https://graphqlpokemon.favware.tech/v7" onClick={handleListClick}>Pokemon</a></li>
                            <li><a value="https://api.spacex.land/graphql/" onClick={handleListClick}>SpaceX</a></li>
                            <li><a value="https://api.stratz.com/graphiql/" onClick={handleListClick}>DOTA 2</a></li>
                            <li><a value="https://hivdb.stanford.edu/page/graphiql/" onClick={handleListClick}>HIVDB</a></li>
                            {/* <li><a href="https://fruits-api.netlify.app/graphql"></a>Fruits</li> */}
                        </ul>
                    </div>
                    <a className="btn btn-ghost rounded-btn" onClick={() => handleEnterClick(e)}>Enter</a>
                </div>
            </div>
        </div>
    );
}

export default Selector;