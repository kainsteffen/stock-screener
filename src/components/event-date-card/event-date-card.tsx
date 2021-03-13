import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { format } from "date-fns/esm";
import React from "react";
import { KEY_STATS, LOGO } from "../../gql/queries/shared";
import Logo from "../logo/logo";

const useStyles = makeStyles({
  logoImg: {
    objectFit: "contain",
    width: "40px",
    height: "40px",
    borderRadius: "100%",
    backgroundColor: "white",
  },
});

export interface EventDateCardProps {
  symbol: string;
  eventType: "earnings" | "dividends";
}

export default function EventCard(props: EventDateCardProps) {
  const classes = useStyles();

  const {
    data: keyStatsData,
    loading: keyStatsLoading,
    error: keyStatsError,
  } = useQuery(KEY_STATS, {
    variables: {
      symbol: props.symbol,
    },
  });

  const { data: logoData, loading: logoLoading, error: logoError } = useQuery(
    LOGO,
    {
      variables: {
        symbol: props.symbol,
      },
    }
  );
  // TODO: Make this more scalable
  return (
    <React.Fragment>
      {keyStatsLoading ||
      keyStatsError ||
      logoLoading ||
      logoError ||
      keyStatsData.keyStats.nextEarningsDate == null ||
      keyStatsData.keyStats.nextEarningsDate == 0 ? (
        <Skeleton height={200} variant="rect" />
      ) : (
        <Grid item xs={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Box marginRight="10px">
                  <Logo symbol={props.symbol} width={40} height={40} />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption" color="textSecondary">
                    {props.symbol}
                  </Typography>
                  <Typography>{"Earnings Call"}</Typography>
                </Box>
              </Box>
              <Typography variant="h5">
                {format(
                  new Date(keyStatsData.keyStats.nextEarningsDate),
                  "MMM do"
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {keyStatsLoading ||
      keyStatsError ||
      logoLoading ||
      logoError ||
      keyStatsData.keyStats.nextDividendDate == null ||
      keyStatsData.keyStats.nextDividendDate == 0 ? (
        <Skeleton height={200} variant="rect" />
      ) : (
        <Grid item xs={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Box marginRight="10px">
                  <Logo symbol={props.symbol} width={40} height={40} />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption" color="textSecondary">
                    {props.symbol}
                  </Typography>
                  <Typography>{"Dividends"}</Typography>
                </Box>
              </Box>
              <Typography variant="h5">
                {format(
                  new Date(keyStatsData.keyStats.nextDividendDate),
                  "MMM do"
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </React.Fragment>
  );
}
