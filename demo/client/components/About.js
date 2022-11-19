import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const About = () => {
  const team = [
    {
      name: 'Kaju Sarkar',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'google.com',
      linkedin: 'google.com',
    },
    {
      name: 'Dhruv Thota',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'google.com',
      linkedin: 'google.com',
    },
    {
      name: 'Andy Zheng',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'google.com',
      linkedin: 'google.com',
    },
    {
      name: 'Roman Darker',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'google.com',
      linkedin: 'google.com',
    },
    {
      name: 'Jonathan Chen',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'google.com',
      linkedin: 'google.com',
    },
  ];

  return (
    <div className='grid grid-cols-5'>
      {team.map((member) => {
        return <TeamMemberCard info={member} />;
      })}
    </div>
  );
};

export default About;
