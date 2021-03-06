import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { strategiesVar } from "../../gql/local-state";

const useStyles = makeStyles({
  dailyChange: {
    color: "#41CE3E",
  },
  fillParent: {
    width: "100%",
    height: "100%",
  },
});

export interface StrategyCardProps {
  strategyId: number;
}

export default function StrategyCard(props: StrategyCardProps) {
  const classes = useStyles();
  const strategy = useReactiveVar(strategiesVar).entities[props.strategyId];
  return (
    <Card>
      <CardActionArea href={`/strategies/${props.strategyId}`}>
        <CardContent className={classes.fillParent}>
          <Typography variant="h6">{strategy.name}</Typography>
          <Box paddingY={1}>
            <Typography color="textSecondary">
              {strategy.description || "No description"}
            </Typography>
          </Box>
          <Typography>1101 Stocks found</Typography>
          <Typography>{`${strategy.indicators.length} Indicators`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
