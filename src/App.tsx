import React from 'react';
import logo from './logo.svg';
import { Button, Drawer, AppBar, Toolbar, Typography, createStyles, makeStyles, Theme, Divider, List, ListItem, ListItemIcon, ListItemText, Badge, IconButton, CssBaseline, Container, Grid, Paper } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import classes from '*.module.css';
import { FullscreenExit, Home as HomeIcon, Settings } from '@material-ui/icons';
import Home from './pages/home/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Discover from './pages/discover/discover';
import Strategies from './pages/strategies/strategies';
import Watchlist from './pages/watchlist/watchlist';
import StockDetail from './pages/stock-detail/stock-detail';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      //position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
    },
    drawerContainer: {
      //overflow: 'auto',
    },
    content: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  }),
);

function App() {

  const classes = useStyles();

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Clipped drawer
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[
              {
                route: '/',
                name: 'Home',
              },
              {
                route: 'strategies',
                name: 'Strategies',
              },
              {
                route: 'discover',
                name: 'Discover',
              },
              {
                route: 'watchlist',
                name: 'Watchlist',
              },].map((item) => (
                <ListItem button component="a" href={item.route} key={item.route}>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/strategies" component={Strategies} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/watchlist" component={Watchlist} />
            <Route exact path="/stock" component={StockDetail} />
          </Switch>
        </Router>
      </main>
    </div >
  );
}

export default App;
