import { useQuery, useReactiveVar } from "@apollo/client";
import {
  Box,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Skeleton from "@material-ui/lab/Skeleton";
import numeral from "numeral";
import React from "react";
import {
  favoritesVar,
  IndicatorValue,
  toggleFavoritedSymbol,
} from "../../gql/local-state";
import { QUOTE } from "../../gql/queries/shared";
import { parseIndicatorValue } from "../../helpers/numbers";
import PercentageChangeLabel from "../percentage-change-label/percentage-change-label";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  likeButton: {
    color: "#F50057",
  },
});

export interface SymbolTableRow {
  symbol: any;
  indicators: IndicatorValue[];
}

export default function SymbolTableRow(props: SymbolTableRow) {
  const classes = useStyles();
  const favorites = useReactiveVar(favoritesVar);

  const { data, loading, error } = useQuery(QUOTE, {
    variables: {
      symbol: props.symbol.symbol,
    },
  });

  return (
    <TableRow key={props.symbol.name}>
      <TableCell component="th" scope="row">
        <IconButton onClick={() => toggleFavoritedSymbol(props.symbol.symbol)}>
          <FavoriteIcon
            className={
              favorites.includes(props.symbol.symbol) ? classes.likeButton : ""
            }
          />
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        <Box>
          <Typography variant="caption" color="textSecondary">
            {props.symbol.name}
          </Typography>
          <Typography>{props.symbol.symbol}</Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        {loading || error ? (
          <Box display="flex" justifyContent="flex-end">
            <Skeleton variant="text" width={50} height={30} />
          </Box>
        ) : (
          numeral(data.symbol.quote.latestPrice).format("$0,0.00")
        )}
      </TableCell>
      <TableCell align="right">
        {loading || error ? (
          <Box display="flex" justifyContent="flex-end">
            <Skeleton variant="text" width={50} height={30} />
          </Box>
        ) : (
          <PercentageChangeLabel
            percentChange={data.symbol.quote.changePercent}
          />
        )}
      </TableCell>
      {props.indicators.map((indicator) => (
        <TableCell key={indicator.key} align="right">
          {parseIndicatorValue(
            props.symbol[indicator.key],
            indicator.valueType
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
