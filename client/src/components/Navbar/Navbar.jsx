import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItemButton, Switch, Typography } from '@mui/material';
import ROUTE_CONSTANT from '@/Routers/routeConstants';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../../utils/useLogout';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setIsAdmin } from '@/redux/reducers/user.reducer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledNavbar = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const TitleWrapper = styled('div')({
  flexGrow: 1,
  textAlign: 'center',
  color: 'black', // Set text color to black
});

Navbar.propTypes = {
  children: PropTypes.any,
};

export default function Navbar({ children }) {
  const [open, setOpen] = useState(false);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  // const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { userLogout } = useLogout();
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const PortalCheck = user?.[0]?.portalRole;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleFlow = (e) => {
    const checked = e.target.checked;
    dispatch(setIsAdmin(e.target.checked));

    if (checked) {
      // setIsAdmin(checked);
      navigate(`${ROUTE_CONSTANT.ADMIN_HOME}`);
    } else {
      // setIsAdmin(checked);

      navigate(`${ROUTE_CONSTANT.HOME}`);
    }
  };

  return (
    <StyledNavbar>
      <AppBar
        sx={{
          // background: '#FFC518',
          background: '#dddddd',
        }}
      >
        <Toolbar
          sx={{
            paddingRight: open ? `${drawerWidth}px` : 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>

          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <TitleWrapper>{'V-List Portal'}</TitleWrapper>
          </Box>

          {/* Spacer to push other items right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Admin Toggle and Icons */}
          {[1, 2].includes(PortalCheck) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '30px',
              }}
            >
              <Switch
                checked={isAdmin}
                onChange={handleToggleFlow}
                color="default"
                inputProps={{ 'aria-label': 'toggle admin flow' }}
              />
              <Typography variant="caption" sx={{ mt: 0.5, color: 'black' }}>
                Admin
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton color="inherit" aria-label="account">
              <AccountCircleIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={userLogout}
            >
              <LogoutIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon sx={{ color: 'black' }} />{' '}
            {/* Set icon color to black */}
          </IconButton>
        </DrawerHeader>
        {!isAdmin ? (
          <List>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/voter')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="View Voters" />
            </ListItemButton>
          </List>
        ) : (
          <List>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Admin Home" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/createUser')}>
              <ListItemIcon>
                <PersonAddAltIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Create User" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/viewUser')}>
              <ListItemIcon>
                <PersonSearchIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="View User" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/extractVoterList')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'black' }} />{' '}
              </ListItemIcon>
              <ListItemText primary="Extract Voter List" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/adminUpload')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Create Voter List" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/createPollingStations')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Create Polling Stations" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/assignConstituency')}>
              <ListItemIcon>
                <AddLocationAltIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Assign Constituency" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/roles')}>
              <ListItemIcon>
                <AddLocationAltIcon sx={{ color: 'black' }} />{' '}
                {/* Set icon color to black */}
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>
          </List>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </StyledNavbar>
  );
}
