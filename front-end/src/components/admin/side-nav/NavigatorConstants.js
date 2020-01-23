import React from 'react';

import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import StarIcon from '@material-ui/icons/Star';
import EmailIcon from '@material-ui/icons/Email';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

export const categories = [
  {
    id: 'Real-time feeds',
    children: [
      {
        id: 'Feedback Feed',
        icon: <StarIcon />,
        active: true,
        link: '/feedback'
      },
      { id: 'Contact Us Feed', icon: <DnsRoundedIcon />, link: '/contact-us' },
      {
        id: 'Theme Change Feed',
        icon: <EmailIcon />,
        link: '/theme-change'
      },
      {
        id: 'User Creation Feed',
        icon: <PeopleIcon />,
        link: '/user-creation'
      }
    ]
  },
  {
    id: 'Analytics',
    children: [
      { id: 'Graphs', icon: <ShowChartIcon />, link: '/' },
      { id: 'User actions', icon: <WbIncandescentIcon />, link: '/' }
    ]
  }
];
