import * as MaterialIcons from '@mui/icons-material';
import * as Material from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { SideBarCompenentStyles } from './component.styles';

const SideBarCompenent = new SideBarCompenentStyles();

export const SideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const componentStyles = SideBarCompenent.generalStyles(open);

  return (
    <Material.Box sx={componentStyles.Box}>
      <Material.CssBaseline />
      <SideBarCompenent.AppBar
        style={componentStyles.AppBar}
        position="fixed"
        open={open}
      >
        <Material.Toolbar>
          <Material.IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={componentStyles.IconButton}
          >
            <MaterialIcons.Menu />
          </Material.IconButton>
        </Material.Toolbar>
      </SideBarCompenent.AppBar>
      <Material.Drawer
        sx={componentStyles.Drawer}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <SideBarCompenent.DrawerHeader>
          <Material.IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <MaterialIcons.ChevronLeft />
            ) : (
              <MaterialIcons.ChevronRight />
            )}
          </Material.IconButton>
        </SideBarCompenent.DrawerHeader>
        <Material.Divider />
        <Material.List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <Material.ListItem key={text} disablePadding>
              <Material.ListItemButton>
                <Material.ListItemIcon>
                  {index % 2 === 0 ? (
                    <MaterialIcons.MoveToInbox />
                  ) : (
                    <MaterialIcons.Mail />
                  )}
                </Material.ListItemIcon>
                <Material.ListItemText primary={text} />
              </Material.ListItemButton>
            </Material.ListItem>
          ))}
        </Material.List>
        <Material.Divider />
        <Material.List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <Material.ListItem key={text} disablePadding>
              <Material.ListItemButton>
                <Material.ListItemIcon>
                  {index % 2 === 0 ? (
                    <MaterialIcons.MoveToInbox />
                  ) : (
                    <MaterialIcons.Mail />
                  )}
                </Material.ListItemIcon>
                <Material.ListItemText primary={text} />
              </Material.ListItemButton>
            </Material.ListItem>
          ))}
        </Material.List>
      </Material.Drawer>
    </Material.Box>
  );
};
