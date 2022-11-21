import React from 'react';

const TeamMemberCard = (props) => {
  return (
    <div>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <figure>
          <img src={props.info.img} alt='img' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{props.info.name}</h2>
          <p>{props.info.description}</p>
          <div className='card-actions justify-center'>
            <div className='btn-group'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = props.info.github;
                }}
                className='btn btn-active'
              >
                Github
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = props.info.linkedin;
                }}
                className='btn'
              >
                Linkedin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
