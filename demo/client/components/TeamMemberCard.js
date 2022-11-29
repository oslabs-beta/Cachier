import React from 'react';
import github from '../styles/github.png';
import linkedin from '../styles/linkedin.png';

const TeamMemberCard = (props) => {
  return (
    <div>
      <div className='card w-80 bg-base-100 shadow-xl'>
        <figure>
          <img className='w-80 h-80' src={props.img} alt='img' />
        </figure>
        <div className='card-body pt-2'>
          <h2 className='card-title m-auto'>{props.info.name}</h2>
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
                <img className='w-6 h-6 mx-1' src={github} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = props.info.linkedin;
                }}
                className='btn'
              >
                Linkedin
                <img className='w-6 h-6 ml-2' src={linkedin} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
