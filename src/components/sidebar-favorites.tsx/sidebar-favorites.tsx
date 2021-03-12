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
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router-dom";
import { favoritesVar } from "../../gql/local-state";
import { LOGO, QUOTE } from "../../gql/queries/shared";
import PercentageChangeLabel from "../percentage-change-label/percentage-change-label";

const useStyles = makeStyles({
  logo: {
    objectFit: "contain",
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "white",
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

  const { data: logoData, loading: logoLoading, error: logoError } = useQuery(
    LOGO,
    {
      variables: {
        symbol: props.symbol,
      },
    }
  );

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
      <Box display="flex" marginRight={1}>
        {logoLoading || logoError ? (
          <Skeleton variant="circle" width={30} height={30} />
        ) : (
          <img src={logoData.logo.url} className={classes.logo} alt="logo" />
        )}
      </Box>
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
