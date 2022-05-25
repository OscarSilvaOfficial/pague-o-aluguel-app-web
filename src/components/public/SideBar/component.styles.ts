import { styled } from '@mui/material/styles';
import * as Material from '@mui/material';
import React from 'react';

export class SideBarCompenentStyles {
  constructor(private _drawerWidth: number = 240) {}

  get Main() {
    const tag = 'main';
    return styled(tag, {
      shouldForwardProp: (prop) => prop !== 'open',
    })<{
      open?: boolean;
    }>(({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${this._drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }));
  }

  get AppBar() {
    return styled(Material.AppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${this._drawerWidth}px)`,
        marginLeft: `${this._drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
  }

  get DrawerHeader() {
    return styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));
  }

  get drawerWidth() {
    return this._drawerWidth;
  }

  generalStyles(iconButtonDisplay: boolean) {
    return {
      Box: {
        display: 'flex',
      } as React.CSSProperties,
      AppBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      } as React.CSSProperties,
      IconButton: {
        mr: 2,
        ...(iconButtonDisplay && { display: 'none' }),
      } as React.CSSProperties,
      Drawer: {
        width: this._drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: this._drawerWidth,
          boxSizing: 'border-box',
        },
      } as React.CSSProperties,
    };
  }
}

interface AppBarProps extends Material.AppBarProps {
  open?: boolean;
}
