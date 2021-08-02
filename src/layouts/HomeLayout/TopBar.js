import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Logo from 'src/components/Logo';
import React, { useState, useRef } from 'react';
import useOffSetTop from 'src/hooks/useOffSetTop';
import homeFill from '@iconify-icons/eva/home-fill';
import PopoverMenu from 'src/components/PopoverMenu';
import roundSpeed from '@iconify-icons/ic/round-speed';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import {
  PATH_HOME,
  PATH_APP,
  PATH_LEARN,
  PATH_DISCOVER,
  PATH_PICKUP
} from 'src/routes/paths';
import bookOpenFill from '@iconify-icons/eva/book-open-fill';
import roundStreetview from '@iconify-icons/ic/round-streetview';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  MenuItem,
  Container,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { MIconButton } from 'src/theme';
import DarkMode from 'src/views/home/LandingPageView/DarkMode';
import { LinkedCamera } from '@material-ui/icons';
import { ReactComponent as LogoIcon } from "src/icons/Goodies_icon_vivid_green.svg";

// ----------------------------------------------------------------------

const MENU_LINKS = [
  { title: 'Home', icon: homeFill, href: '/' },
  {
    title: 'Discover',
    icon: roundStreetview,
    href: PATH_DISCOVER.general1.discover
  },
  { title: 'Pick Up', icon: roundSpeed, href: PATH_PICKUP.general3.pickup },
  // { title: "Goody's Hub", icon: roundSpeed, href: PATH_HOME.dashboard },
  { title: 'Learn', icon: bookOpenFill, href: PATH_LEARN.general2.learn }
];

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 96;

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: APP_BAR_MOBILE,
    // backgroundColor: 'red',
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      height: APP_BAR_DESKTOP
    }
  },
  logo: {
    textDecoration: 'none'
  },
  switch: {
    marginLeft: theme.spacing(3)
  },
  isHome: {
    color: theme.palette.common.white
  },
  isDesktopActive: {
    color: theme.palette.primary.main
  },
  isMobileActive: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  },
  onScroll: {
    '& $toolbar': {
      backgroundColor: theme.palette.background.default
    },
    '& $isHome': {
      color: theme.palette.text.primary
    },
    [theme.breakpoints.up('md')]: {
      '& $toolbar': {
        height: APP_BAR_DESKTOP - 20
      }
    }
  }
}));

// ----------------------------------------------------------------------

function TopBar() {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const { pathname } = useLocation();
  const offset = useOffSetTop(100);
  const [openMenu, setOpenMenu] = useState(false);
  const isHome = pathname === '/';

  const renderMenuDesktop = (
    <div className={classes.display}>
      {MENU_LINKS.map((link) => {
        return (
          <Link
            exact
            to={link.href}
            key={link.title}
            underline="none"
            variant="subtitle2"
            component={RouterLink}
            activeClassName={classes.isDesktopActive}
            className={clsx({
              [classes.isHome]: isHome
            })}
            sx={{ mr: 5, color: 'text.primary' }}
          >
            {link.title}
          </Link>
        )})}
    </div>
  );

  const renderMenuMobile = (
    <PopoverMenu
      width={220}
      open={openMenu}
      anchorEl={anchorRef.current}
      onClose={() => setOpenMenu(false)}
    >
      <List>
        {MENU_LINKS.map((link) => (
          <MenuItem
            exact
            to={link.href}
            key={link.title}
            component={RouterLink}
            onClick={() => setOpenMenu(false)}
            activeClassName={classes.isMobileActive}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <Icon icon={link.icon} width={20} height={20} />
            </ListItemIcon>
            <ListItemText>{link.title}</ListItemText>
          </MenuItem>
        ))}
      </List>
    </PopoverMenu>
  );

  return (
    <AppBar
      color="transparent"
      className={clsx(classes.root, { [classes.onScroll]: offset })}
      sx={{ boxShadow: 'none' }}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <Container
          maxWidth="lg"
          sx={{
            lineHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/" className={classes.logo}>
            <Typography
              underline="none"
              variant="h4"
              // sx={{ color: 'common.white' }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LogoIcon style={{ width: '30px', height: '30px', marginRight: '20px', marginLeft: '20px' }}/>
              Goody's
            </Typography>
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />

          <Hidden mdDown>{renderMenuDesktop}</Hidden>

          <Button
            underline="none"
            variant="contained"
            component={Link}
            target="_blank"
            href={PATH_HOME.purchase}
          >
            <Link href={PATH_APP.general.root} color="white">
              Sign In
            </Link>
          </Button>

          <div className={classes.switch}>
            <DarkMode />
          </div>

          <Hidden mdUp>
            <MIconButton
              ref={anchorRef}
              onClick={() => setOpenMenu(true)}
              className={clsx({
                [classes.isHome]: isHome
              })}
            >
              <Icon icon={menu2Fill} />
            </MIconButton>
            {renderMenuMobile}
          </Hidden>
        </Container>
      </Toolbar>
      {offset && (
        <Box
          sx={{
            left: 0,
            right: 0,
            bottom: 0,
            height: 24,
            zIndex: -1,
            margin: 'auto',
            borderRadius: '50%',
            position: 'absolute',
            width: `calc(100% - 48px)`,
            boxShadow: (theme) => theme.shadows[25].z8
          }}
        />
      )}
    </AppBar>
  );
}

export default TopBar;
