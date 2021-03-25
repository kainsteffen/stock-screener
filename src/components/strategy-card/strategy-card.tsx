import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { strategiesVar } from "../../gql/local-state";

const useStyles = makeStyles({
  dailyChange: {
    color: "#41CE3E",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card>
      <CardActionArea href={`/strategies/${props.strategyId}`}>
        <CardContent className={classes.fillParent}>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.title} variant="h6">
              {strategy.name}
            </Typography>

            <EditIcon />
          </Box>
          {/* TODO Make line count limit responsive */}
          <Box
            height={75}
            marginY={1}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            <Typography color="textSecondary">
              {strategy.description || "No description"}
            </Typography>
          </Box>
          {/* <Typography>1101 Stocks found</Typography> */}
          <Typography>
            {strategy.indicators.length === 1
              ? `${strategy.indicators.length} Indicator`
              : `${strategy.indicators.length} Indicators`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button onClick={handleClick} size="small" color="primary">
            See Results
          </Button>
        </Box>
      </CardActions>
      {/* TODO: Remove this placeholder */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`See the results of ${strategy.name} on the Discover Page`}
      />
    </Card>
  );
}
