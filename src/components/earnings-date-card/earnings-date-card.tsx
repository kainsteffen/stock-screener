import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  logoImg: {
    width: "40px",
    height: "40px",
    borderRadius: "100%",
  },
});

export interface EarningsDateCardProps {
  imgSrc: string;
  ticker: string;
  name: string;
  date: string;
  currentEPS: number;
  expectedEPS: number;
}

export default function EarningsDateCard(props: EarningsDateCardProps) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box marginRight="10px">
            <img src={props.imgSrc} className={classes.logoImg} />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {props.ticker}
            </Typography>
            <Typography>{props.name}</Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="textSecondary">
          Date
        </Typography>
        <Typography>{props.date}</Typography>
        <Typography variant="caption" color="textSecondary">
          Current EPS
        </Typography>
        <Typography>{props.currentEPS}</Typography>
        <Typography variant="caption" color="textSecondary">
          Expected EPS
        </Typography>
        <Typography> {props.expectedEPS}</Typography>
      </CardContent>
    </Card>
  );
}
