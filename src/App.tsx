import { ApolloClient, ApolloProvider, useReactiveVar } from "@apollo/client";
import {
  Box,
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CustomDrawer from "./components/custom-drawer/custom-drawer";
import CustomTabBar from "./components/custom-tab-bar/custom-tab-bar";
import CustomizeDashboardDialog from "./components/dialogs/customize-dashboard-dialog/customize-dashboard-dialog";
import OnboardingDialog from "./components/onboarding-dialog/onboarding-dialog";
import SettingsMenuButton from "./components/settings-menu-button/settings-popup-button";
import SymbolSearchHoc from "./components/symbol-search-hoc/symbol-search-hoc";
import { cache, localTypeDefs } from "./gql/cache";
import { sessionVar, setFirstTime } from "./gql/local-state";
import Discover from "./pages/discover/discover";
import Favorites from "./pages/favorites/favorites";
import Home from "./pages/home/home";
import Strategies from "./pages/strategies/strategies";
import StrategyDetail from "./pages/strategy-detail/strategy-detail";
import SymbolDetail from "./pages/symbol-detail/symbol-detail";
import { theme } from "./theme";

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
  const isTabNav = useMediaQuery(theme.breakpoints.down("sm"));
  const [openCustomizeDashboard, setOpenCustomizeDashboard] = useState(false);
  const session = useReactiveVar(sessionVar);
  const client = new ApolloClient({
    uri:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_PRODUCTION_API_URL
        : process.env.REACT_APP_DEV_API_URL,
    cache: cache,
    typeDefs: localTypeDefs,
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <CustomDrawer />
            <Box width="100%" paddingBottom={isTabNav ? 10 : 0}>
              <Container>
                <Box display="flex" alignItems="center" paddingY="10px">
                  <div className={classes.searchInputContainer}>
                    <SymbolSearchHoc />
                  </div>
                  <Box flexGrow={1}></Box>
                  {/* <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton> */}
                  <SettingsMenuButton
                    onOpenCustomizeDashboard={() =>
                      setOpenCustomizeDashboard(true)
                    }
                  />
                  <CustomizeDashboardDialog
                    open={openCustomizeDashboard}
                    onSetOpen={(open: boolean) =>
                      setOpenCustomizeDashboard(open)
                    }
                  />
                  <OnboardingDialog
                    open={session.firstTime}
                    onDone={() => setFirstTime(false)}
                  />
                </Box>
              </Container>
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
                  <Route exact path="/symbols/:id" component={SymbolDetail} />
                </Switch>
              </main>
            </Box>
            <CustomTabBar />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
