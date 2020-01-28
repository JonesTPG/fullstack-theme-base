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
        id: 'Feedback',
        icon: <StarIcon />,
        active: true,
        link: '/feed/feedback'
      },
      {
        id: 'Contact Us',
        icon: <DnsRoundedIcon />,
        link: '/feed/contact-us'
      },
      {
        id: 'Theme Change',
        icon: <EmailIcon />,
        link: '/feed/theme-change'
      },
      {
        id: 'User Creation',
        icon: <PeopleIcon />,
        link: '/feed/user-creation'
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
