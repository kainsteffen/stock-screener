import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Chip,
  Grid,
  GridSize,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";
import { favoritesVar } from "../../gql/local-state";

const useStyles = makeStyles({
  emptyPrompt: {
    width: "100%",
    height: "100%",
    color: "grey",
    border: "1px dashed",
    borderRadius: "8px",
  },
});

export interface DashboardElementProps {
  xs: GridSize;
  sm: GridSize;
  md: GridSize;
  lg: GridSize;
  xl: GridSize;
  name: string;
  renderChild: (symbol: string) => JSX.Element;
}

export default function DashboardElement(props: DashboardElementProps) {
  const classes = useStyles();
  const favorites = useReactiveVar(favoritesVar);
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const breakpoints: { [key: string]: boolean } = {
    xs: useMediaQuery(theme.breakpoints.only("xs")),
    sm: useMediaQuery(theme.breakpoints.only("sm")),
    md: useMediaQuery(theme.breakpoints.only("md")),
    lg: useMediaQuery(theme.breakpoints.only("lg")),
    xl: useMediaQuery(theme.breakpoints.only("xl")),
  };
  const breakPointToPropField: { [key: string]: GridSize } = {
    xs: props.xs,
    sm: props.sm,
    md: props.md,
    lg: props.lg,
    xl: props.xl,
  };

  const currentBreakpoint: string =
    Object.keys(breakpoints).find((key: string) => breakpoints[key]) ?? "";
  const displayCount =
    12 / (breakPointToPropField[currentBreakpoint] as number);
  const itemLeft = favorites.length - displayCount;

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          {props.name}
        </Typography>
        <Box display="flex" alignItems="center">
          {
            <Chip
              onClick={() => setExpanded((prev) => !prev)}
              label={!expanded ? itemLeft + " more" : "Hide"}
              variant="outlined"
              clickable
            />
          }
          <IconButton onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={3} direction="row">
        {favorites.length > 0 ? (
          favorites.map((symbol, index, arr) => {
            if (expanded ? index < arr.length : index < displayCount) {
              return (
                <Grid
                  item
                  key={symbol}
                  xs={props.xs}
                  sm={props.sm}
                  md={props.md}
                  lg={props.lg}
                  xl={props.xl}
                >
                  {props.renderChild(symbol)}
                </Grid>
              );
            } else {
              return null;
            }
          })
        ) : (
          <Grid
            item
            xs={props.xs}
            sm={props.sm}
            md={props.md}
            lg={props.lg}
            xl={props.xl}
          >
            <Box className={classes.emptyPrompt}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={5}
              >
                <Typography>
                  Follow some stocks to see information here
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
