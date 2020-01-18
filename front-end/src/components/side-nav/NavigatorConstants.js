import React from 'react';

import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

export const categories = [
  {
    id: 'Applications',
    children: [
      {
        id: 'Feedback Feed',
        icon: <PeopleIcon />,
        active: true,
        link: '/feedback'
      },
      { id: 'Database', icon: <DnsRoundedIcon />, link: '/' },
      { id: 'Storage', icon: <PermMediaOutlinedIcon />, link: '/' },
      { id: 'Hosting', icon: <PublicIcon />, link: '/' },
      { id: 'Functions', icon: <SettingsEthernetIcon />, link: '/' },
      { id: 'ML Kit', icon: <SettingsInputComponentIcon />, link: '/' }
    ]
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon />, link: '/' },
      { id: 'Performance', icon: <TimerIcon />, link: '/' },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon />, link: '/' }
    ]
  }
];
