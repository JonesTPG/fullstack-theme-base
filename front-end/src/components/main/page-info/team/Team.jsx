import React from 'react';

import { teamData } from './teamData';
import TeamMember from './TeamMember';

const Team = () => {
  return (
    <>
      <h3>Team behind the application:</h3>
      {teamData.map(member => (
        <TeamMember member={member} key={member.name} />
      ))}
    </>
  );
};

export default Team;
