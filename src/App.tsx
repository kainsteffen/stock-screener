import { ApolloClient, ApolloProvider } from "@apollo/client";
import {
  Badge,
  Box,
  createMuiTheme,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  fade,
  IconButton,
  makeStyles,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import AppleIcon from "@material-ui/icons/Apple";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchInput from "./components/search-input/search-input";
import SidebarFavorites from "./components/sidebar-favorites.tsx/sidebar-favorites";
import SidebarNav from "./components/sidebar-nav/sidebar-nav";
import { cache, localTypeDefs } from "./gql/cache";
import Discover from "./pages/discover/discover";
import Favorites from "./pages/favorites/favorites";
import Home from "./pages/home/home";
import Strategies from "./pages/strategies/strategies";
import StrategyDetail from "./pages/strategy-detail/strategy-detail";
import SymbolDetail from "./pages/symbol-detail/symbol-detail";

const drawerWidth = 240;

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    customColors: {
      numberChange: {
        positive: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
        negative: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
      };
    };
  }
  interface ThemeOptions {
    customColors: {
      numberChange: {
        positive: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
        negative: {
          color: React.CSSProperties["color"];
          backgroundColor: React.CSSProperties["color"];
        };
      };
    };
  }
}

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        ".MuiCard-root": {
          borderRadius: "8px",
        },
        ".MuiButton-root": {
          borderRadius: "500px",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      light: "#757ce8",
      main: "#1EB980",
      dark: "#045D56",
      contrastText: "#fff",
    },
  },
  customColors: {
    numberChange: {
      positive: {
        color: "#41CE3E",
        backgroundColor: fade("#41CE3E", 0.15),
      },
      negative: {
        color: "#FF6262",
        backgroundColor: fade("#FF6262", 0.15),
      },
    },
  },
});

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
  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: cache,
    typeDefs: localTypeDefs,
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <Drawer
              className={classes.drawer}
              variant="permanent"
              open={true}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {/* <Toolbar /> */}
              <div className={classes.drawerContainer}>
                <Box
                  display="flex"
                  alignItems="center"
                  marginLeft={2}
                  paddingY={1}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <AppleIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap className={classes.title}>
                    <a href="/" className={classes.link}>
                      StockBook
                    </a>
                  </Typography>
                </Box>
                <SidebarNav />
                <Divider />
                <SidebarFavorites />
              </div>
            </Drawer>
            <Box display="flex" flexDirection="column" width="100%">
              <Box
                display="flex"
                alignItems="center"
                paddingX="20px"
                paddingY="10px"
              >
                <div className={classes.searchInputContainer}>
                  <SearchInput
                    placeholder="Search stocks, indicators or strategies"
                    searchTerm=""
                    onSetSearchTerm={(searchTerm) => {}}
                  />
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
              </Box>
              <main className={classes.content}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/strategies" component={Strategies} />
                  <Route
                    exact
                    path="/strategies/:id"
                    component={StrategyDetail}
                  />
                  <Route
                    exact
                    path="/strategies/create"
                    component={StrategyDetail}
                  />
                  <Route exact path="/discover" component={Discover} />
                  <Route exact path="/favorites" component={Favorites} />
                  <Route exact path="/stocks/:id" component={SymbolDetail} />
                </Switch>
              </main>
            </Box>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
