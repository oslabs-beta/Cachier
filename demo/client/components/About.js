import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import andy from '../styles/andy.png'
import dhruv from '../styles/dhruv.png'
import kaju from '../styles/kaju.png'
import jonathan from '../styles/jonathan.png'
import roman from '../styles/roman.png'

const About = () => {
  const team = [
    {
      name: 'Kaju Sarkar',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://www.google.com/',
      linkedin: 'https://www.google.com/',
    },
    {
      name: 'Dhruv Thota',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://www.google.com/',
      linkedin: 'https://www.google.com/',
    },
    {
      name: 'Andy Zheng',
      img: {andy},
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://www.google.com/',
      linkedin: 'https://www.google.com/',
    },
    {
      name: 'Roman Darker',
      img: {roman},
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://www.google.com/',
      linkedin: 'https://www.google.com/',
    },
    {
      name: 'Jonathan Chen',
      img: {jonathan},
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://www.google.com/',
      linkedin: 'https://www.google.com/',
    },
  ];

  return (
    <div className='about flex mt-20 gap-3 justify-center	max-w-7xl flex-wrap m-auto'>
      <TeamMemberCard key={kaju} info={team[0]} img={kaju} />
      <TeamMemberCard key={dhruv} info={team[1]} img={dhruv} />
      <TeamMemberCard key={andy} info={team[2]} img={andy} />
      <TeamMemberCard key={roman} info={team[3]} img={roman} />
      <TeamMemberCard key={jonathan} info={team[4]} img={jonathan} />
      {/* {team.map((member) => {
        return <TeamMemberCard key={member.name} info={member} img={member.img} />;
      })} */}
    </div>
  );
};

export default About;
