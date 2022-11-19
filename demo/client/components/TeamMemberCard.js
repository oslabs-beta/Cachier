import React from 'react';

const TeamMemberCard = (props) => {
  return (
    <div>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <figure>
          <img
            src='https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg'
            alt='img'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{props.name}</h2>
          <p>{props.description}</p>
          <div className='card-actions justify-center'>
            <div className='btn-group'>
              <button className='btn btn-active'>Github</button>
              <button className='btn'>Linkedin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
