import React from 'react';

const TeamMemberCard = (props) => {
  return (
    <div>
      <img src={props.img} />
      <h2>Name</h2>
      <div>
        <button>github</button>
        <button>linkedin</button>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut
        magna a sapien facilisis consequat. Duis blandit ultricies porta. Proin
        viverra et sapien eu iaculis. Etiam euismod quam felis, non mollis odio
        semper vel. Fusce molestie tortor et lacus viverra molestie nec quis
        dui. Cras quis lacus sit amet nibh vestibulum pharetra sit amet id nisl.
        Sed sit amet mollis quam. In porta bibendum enim eu venenatis. Ut
        sagittis imperdiet felis. Etiam semper mi risus, suscipit bibendum neque
        placerat et. Sed sit amet justo dictum, dignissim magna scelerisque,
        gravida nulla. Donec efficitur quam in sem vestibulum elementum. Donec
        ac est aliquet, finibus quam eget, viverra justo. Nam dictum, dui vel
        bibendum eleifend, massa urna laoreet erat, ac hendrerit sem purus non
        tellus.
      </p>
    </div>
  );
};

export default TeamMemberCard;
