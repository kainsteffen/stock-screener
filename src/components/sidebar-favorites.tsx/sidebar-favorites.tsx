import { useQuery, useReactiveVar } from "@apollo/client";
import {
  Box,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import { useHistory } from "react-router-dom";
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
  fullWidth: {
    width: "100%",
  },
});

export interface SidebarFavoriteEntryProps {
  symbol: string;
}

function SidebarFavoriteEntry(props: SidebarFavoriteEntryProps) {
  const classes = useStyles();
  const history = useHistory();
  const { data, loading, error } = useQuery(QUOTE, {
    variables: { symbol: props.symbol },
  });

  const navigateTo = (path: string) => {
    history.replace(`/stocks/${path}`);
  };

  if (loading) return <React.Fragment />;
  if (error) return <p>Error</p>;

  return (
    <ListItem
      button
      key={props.symbol}
      onClick={() => navigateTo(props.symbol)}
    >
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
  const history = useHistory();
  const favorites = useReactiveVar(favoritesVar);

  return (
    <React.Fragment>
      <Box width="100%">
        <ButtonBase
          className={classes.fullWidth}
          onClick={() => history.replace("/favorites")}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            paddingX={2}
            paddingY={2}
            width="100%"
          >
            <Box marginRight={1}>
              <Typography color="textSecondary">Followed</Typography>
            </Box>
            <ArrowForwardIcon color="disabled" />
          </Box>
        </ButtonBase>
      </Box>
      <List disablePadding>
        {favorites &&
          favorites.map((favorite: any) => {
            return (
              <React.Fragment key={favorite}>
                {<SidebarFavoriteEntry symbol={favorite} />}
              </React.Fragment>
            );
          })}
      </List>
    </React.Fragment>
  );
}
