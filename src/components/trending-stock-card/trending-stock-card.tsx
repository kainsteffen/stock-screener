import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import { QUOTE } from "../../gql/queries/client";

const useStyles = makeStyles({
  title: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  dailyChangePos: {
    color: "#41CE3E",
  },
  dailyChangeNeg: {
    color: "red",
  },
});

export interface TrendingStockCardProps {
  symbol: string;
}

export default function TrendingStockCard(props: TrendingStockCardProps) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(QUOTE, {
    variables: { symbol: props.symbol },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <Card>
      <CardActionArea href="stock">
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" display="inline" className={classes.title}>
              {data.symbol.quote.symbol}
            </Typography>
            <Typography
              variant="body1"
              display="inline"
              className={
                data.symbol.quote.changePercent >= 0
                  ? classes.dailyChangePos
                  : classes.dailyChangeNeg
              }
            >
              {numeral(data.symbol.quote.changePercent).format("0.00%")}
            </Typography>
          </Box>
          <Box marginY={1.5}>
            <Typography variant="h5">
              ${data.symbol.quote.latestPrice.toFixed(2)}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="textSecondary">
            52 week range
          </Typography>
          <Typography variant="subtitle1">{`$${data.symbol.quote.week52Low} - $${data.symbol.quote.week52High}`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
