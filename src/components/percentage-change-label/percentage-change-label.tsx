import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import numeral from "numeral";
import React from "react";

const useStyle = makeStyles((theme) =>
  createStyles({
    positive: {
      color: theme.customColors.numberChange.positive.color,
      backgroundColor: theme.customColors.numberChange.positive.backgroundColor,
    },
    negative: {
      color: theme.customColors.numberChange.negative.color,
      backgroundColor: theme.customColors.numberChange.negative.backgroundColor,
    },
  })
);

export interface PercentageChangeLabelProps {
  percentChange: number;
}

export default function PercentageChangeLabel(
  props: PercentageChangeLabelProps
) {
  const classes = useStyle();
  const isPositive = props.percentChange >= 0;

  return (
    <Box
      display="flex"
      className={isPositive ? classes.positive : classes.negative}
      borderRadius={100}
      paddingRight={0.7}
      paddingY={0.5}
    >
      {isPositive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      <Typography>
        {numeral(Math.abs(props.percentChange)).format("0.00%")}
      </Typography>
    </Box>
  );
}
