import {
  AppBar,
  Badge,
  Box,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AppleIcon from "@material-ui/icons/Apple";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchInput from "./components/search-input/search-input";
import SidebarWatchlist from "./components/sidebar-watchlist/sidebar-watchlist";
import CreateStrategy from "./pages/create-strategy/create-strategy";
import Discover from "./pages/discover/discover";
import Home from "./pages/home/home";
import StockDetail from "./pages/stock-detail/stock-detail";
import Strategies from "./pages/strategies/strategies";
import Watchlist from "./pages/watchlist/watchlist";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
    },
    searchInputContainer: {
      width: "60%",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      whiteSpace: "nowrap",
      width: drawerWidth,
    },
    drawerContainer: {},
    content: {
      width: "100%",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    link: {
      textDecoration: "none",
      color: "white",
      "&:visited": {
        color: "white",
      },
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <AppleIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            <a href="/" className={classes.link}>
              StockBook
            </a>
          </Typography>
          <div className={classes.searchInputContainer}>
            <SearchInput />
          </div>
          <Box flexGrow={1}></Box>
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
                route: "/",
                name: "Home",
              },
              {
                route: "strategies",
                name: "Strategies",
              },
              {
                route: "discover",
                name: "Discover",
              },
              {
                route: "watchlist",
                name: "Watchlist",
              },
            ].map((item) => (
              <ListItem button component="a" href={item.route} key={item.route}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <SidebarWatchlist />
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/strategies" component={Strategies} />
            <Route exact path="/strategies/create" component={CreateStrategy} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/watchlist" component={Watchlist} />
            <Route exact path="/stock" component={StockDetail} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
