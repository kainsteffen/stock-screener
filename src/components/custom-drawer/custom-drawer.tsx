import {
  Box,
  createStyles,
  Divider,
  Drawer,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import SidebarFavorites from "../sidebar-favorites.tsx/sidebar-favorites";
import SidebarNav from "../sidebar-nav/sidebar-nav";

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

export default function CustomDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const shouldRender = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <React.Fragment>
      {shouldRender ? (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <Box display="flex" alignItems="center" marginLeft={2} paddingY={1}>
              <Typography variant="h6" noWrap className={classes.title}>
                <a href="/" className={classes.link}>
                  Stockify
                </a>
              </Typography>
            </Box>
            <SidebarNav />
            <Divider />
            <SidebarFavorites />
          </div>
        </Drawer>
      ) : null}
    </React.Fragment>
  );
}
