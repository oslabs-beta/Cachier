import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
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
      github: 'https://github.com/kajusarkar',
      linkedin: 'https://www.linkedin.com/in/kaju-sarkar-a6329862/',
    },
    {
      name: 'Dhruv Thota',
      img: 'https://www.meme-arsenal.com/memes/18a3373dd7ab767f3cf1ad96b5cbc204.jpg',
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://github.com/L05Dhruv',
      linkedin: 'https://www.linkedin.com/in/dhruv-thota/',
    },
    {
      name: 'Andy Zheng',
      img: {andy},
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://github.com/andy5313',
      linkedin: 'https://www.linkedin.com/in/andyzheng5313/',
    },
    {
      name: 'Roman Darker',
      img: {roman},
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://github.com/romanjamesd',
      linkedin: 'https://www.linkedin.com/in/roman-darker-707147175/',
    },
    {
      name: 'Jonathan Chen',
      img: {jonathan},
      description: ` Lorem Aliquam sit amet porta justo. Duis nec lorem vel risus
  molestie mattis. Ut id velit et felis imperdiet euismod. Sed a leo
  sed urna egestas viverra. Donec dignissim sem eu sapien fringilla
  vestibulum.`,
      github: 'https://github.com/jchen0903i',
      linkedin: 'https://www.linkedin.com/in/jonathan-chen3/',
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
