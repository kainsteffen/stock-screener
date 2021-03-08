import { useQuery, useReactiveVar } from "@apollo/client";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { favoritesVar } from "../../gql/local-state";
import { QUOTE } from "../../gql/queries/shared";
import PercentageChangeLabel from "../percentage-change-label/percentage-change-label";

const useStyles = makeStyles({
  logo: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
  placeHolder: {
    backgroundColor: "grey",
  },
  green: {
    color: "#41CE3E",
  },
  red: {
    color: "#FF6262",
  },
});

export interface SidebarFavoriteEntryProps {
  symbol: string;
}

function SidebarFavoriteEntry(props: SidebarFavoriteEntryProps) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(QUOTE, {
    variables: { symbol: props.symbol },
  });

  if (loading) return <React.Fragment />;
  if (error) return <p>Error</p>;

  return (
    <ListItem button key={props.symbol}>
      <img
        src="//logo.clearbit.com/apple.com?size=100"
        className={classes.logo}
        alt="logo"
      />
      <ListItemText primary={props.symbol} />
      <PercentageChangeLabel percentChange={data.symbol.quote.changePercent} />
    </ListItem>
  );
}

export default function SidebarFavorites() {
  const classes = useStyles();
  const favorites = useReactiveVar(favoritesVar);

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My Favorites
        </ListSubheader>
      }
    >
      {favorites &&
        favorites.map((favorite: any) => {
          return (
            <React.Fragment key={favorite}>
              {<SidebarFavoriteEntry symbol={favorite} />}
            </React.Fragment>
          );
        })}
      <ListItem button key="apple">
        <img
          src="//logo.clearbit.com/apple.com?size=100"
          className={classes.logo}
          alt="logo"
        />
        <ListItemText primary="AAPL" />
        <Typography className={classes.green}>2.43%</Typography>
      </ListItem>
      <ListItem button key="MSFT">
        <img
          src="//logo.clearbit.com/microsoft.com?size=100"
          className={classes.logo}
          alt="logo"
        />
        <ListItemText primary="MSFT" />
        <Typography className={classes.red}>2.43%</Typography>
      </ListItem>
      <ListItem button key="AMZN">
        <img
          src="//logo.clearbit.com/amazon.com?size=100"
          className={classes.logo}
          alt="logo"
        />
        <ListItemText primary="AMZN" />
        <Typography className={classes.green}>2.43%</Typography>
      </ListItem>
    </List>
  );
}
