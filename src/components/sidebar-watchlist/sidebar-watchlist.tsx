import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  logo: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  green: {
    color: "#41CE3E",
  },
  red: {
    color: "#FF6262",
  },
});

export default function SidebarWatchlist() {
  const classes = useStyles();

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My Watchlist
        </ListSubheader>
      }
    >
      <ListItem button key="apple">
        <img
          src="//logo.clearbit.com/apple.com?size=100"
          className={classes.logo}
        />
        <ListItemText primary="AAPL" />
        <Typography className={classes.green}>2.43%</Typography>
      </ListItem>
      <ListItem button key="MSFT">
        <img
          src="//logo.clearbit.com/microsoft.com?size=100"
          className={classes.logo}
        />
        <ListItemText primary="MSFT" />
        <Typography className={classes.red}>2.43%</Typography>
      </ListItem>
      <ListItem button key="AMZN">
        <img
          src="//logo.clearbit.com/amazon.com?size=100"
          className={classes.logo}
        />
        <ListItemText primary="AMZN" />
        <Typography className={classes.green}>2.43%</Typography>
      </ListItem>
    </List>
  );
}
