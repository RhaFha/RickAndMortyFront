import * as React from 'react';
import { useTheme } from '@mui/material';
import {Link, NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Logo from '../img/logo-2.png';

const pages = [{name: 'Personajes', href: '/personaje', icon: <PersonIcon />}, {name: 'Lugares', href: '/lugar', icon: <PlaceIcon />}, {name:'Episodios', href: '/episodio', icon: <FormatListBulletedIcon />}];
type Anchor = 'top' | 'left' | 'bottom' | 'right';

function NavBar() {
  const [state, setState] = React.useState(false);
  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };
    const list = () => (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {pages.map((pagina, index) => (
            <ListItem key={pagina.name} disablePadding>
              <ListItemButton component={Link} to={pagina.href} >
                <ListItemIcon>
                  {pagina.icon}
                </ListItemIcon>
                <ListItemText primary={pagina.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

  const theme = useTheme();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '40px' }} component={Link} to='/' >
            <img src={Logo} alt='logo' style={{ width: '100%'}} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Rick And Morty
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
                  <Drawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer(false)}
                  >
                    {list()}
                  </Drawer>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: '60px' }} component={Link} to='/' >
            <img src={Logo} alt='logo' style={{ width: '100%'}} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={'/'}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Rick And Morty
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              sx={{ my: 2, color: 'white', display: 'block', padding: 0 }}
              key={page.name}
              >
              <NavLink
                to={page.href}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: "#FFFFFF",
                    textDecoration: 'none',
                    backgroundColor: isActive && theme.palette.primary.dark,
                    padding: '6px',
                    borderRadius: '4px',
                  };
                }}
              >
                {page.name}
              </NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, height: '40px', width: '40px' }} />
        </Toolbar>
      </Container>
      
    </AppBar>
  );
}
export default NavBar;



