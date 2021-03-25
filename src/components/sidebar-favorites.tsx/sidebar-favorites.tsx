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
import { QUOTE } from "../../gql/queries/shared";
import Logo from "../logo/logo";
import PercentageChangeLabel from "../percentage-change-label/percentage-change-label";

const useStyles = makeStyles({
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
    history.replace(`/symbols/${path}`);
  };

  return (
    <React.Fragment>
      {loading || error ? (
        <ListItem>
          <Skeleton width="100%" height={30} variant="rect" />
        </ListItem>
      ) : (
        <ListItem
          button
          key={props.symbol}
          onClick={() => navigateTo(props.symbol)}
        >
          <Box marginRight={1}>
            <Logo symbol={props.symbol} width={30} height={30} />
          </Box>
          <ListItemText primary={props.symbol} />
          <PercentageChangeLabel
            percentChange={data.symbol.quote.changePercent}
          />
        </ListItem>
      )}
    </React.Fragment>
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
          // onClick={() => history.replace("/favorites")}
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
