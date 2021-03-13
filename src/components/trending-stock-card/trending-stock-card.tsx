import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { QUOTE } from "../../gql/queries/shared";
import PercentageChangeLabel from "../percentage-change-label/percentage-change-label";

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

  return (
    <React.Fragment>
      {loading || error ? (
        <Skeleton
          style={{ borderRadius: "10px" }}
          height={207}
          variant="rect"
        />
      ) : (
        <Card>
          <CardActionArea href={`symbols/${props.symbol}`}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  display="inline"
                  className={classes.title}
                >
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
                  <PercentageChangeLabel
                    percentChange={data.symbol.quote.changePercent}
                  />
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
      )}
    </React.Fragment>
  );
}
