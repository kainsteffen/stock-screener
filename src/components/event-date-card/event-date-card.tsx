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
import { format } from "date-fns/esm";
import React from "react";
import { KEY_STATS } from "../../gql/queries/shared";

const useStyles = makeStyles({
  logoImg: {
    objectFit: "contain",
    width: "40px",
    height: "40px",
    borderRadius: "100%",
    backgroundColor: "white",
  },
  dateIcon: {
    backgroundColor: "#1EB980",
    "& p": {
      margin: 0,
      fontSize: 12,
    },
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

  // const { data: logoData, loading: logoLoading, error: logoError } = useQuery(
  //   LOGO,
  //   {
  //     variables: {
  //       symbol: props.symbol,
  //     },
  //   }
  // );

  const renderDividendDate = () => {
    if (
      keyStatsData.keyStats.nextDividendDate == null ||
      keyStatsData.keyStats.nextDividendDate == 0
    ) {
      return <div />;
    } else {
      return (
        <Box marginTop={3}>
          <Card>
            <CardActionArea href={`symbols/${props.symbol}`}>
              <CardContent>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Box
                    width={45}
                    height={45}
                    borderRadius="10px"
                    marginRight="10px"
                    className={classes.dateIcon}
                    padding={1}
                  >
                    <p>
                      {format(
                        new Date(keyStatsData.keyStats.nextEarningsDate),
                        "MMM"
                      )}
                    </p>
                    <p>
                      {format(
                        new Date(keyStatsData.keyStats.nextEarningsDate),
                        "do"
                      )}
                    </p>
                    {/* <Logo symbol={props.symbol} width={40} height={40} /> */}
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="caption" color="textSecondary">
                      {props.symbol}
                    </Typography>
                    <Typography>{"Dividends"}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      );
    }
  };

  // TODO: Make this more scalable
  return (
    <Box>
      {keyStatsLoading ||
      keyStatsError ||
      // logoLoading ||
      // logoError ||
      keyStatsData.keyStats.nextEarningsDate == null ||
      keyStatsData.keyStats.nextEarningsDate == 0 ? (
        <Skeleton
          style={{ borderRadius: "10px" }}
          height={125}
          variant="rect"
        />
      ) : (
        <Card>
          <CardActionArea href={`symbols/${props.symbol}`}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Box
                  width={45}
                  height={45}
                  borderRadius="10px"
                  marginRight="10px"
                  className={classes.dateIcon}
                  padding={1}
                >
                  <p>
                    {format(
                      new Date(keyStatsData.keyStats.nextEarningsDate),
                      "MMM"
                    )}
                  </p>
                  <p>
                    {format(
                      new Date(keyStatsData.keyStats.nextEarningsDate),
                      "do"
                    )}
                  </p>
                  {/* <Logo symbol={props.symbol} width={40} height={40} /> */}
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption" color="textSecondary">
                    {props.symbol}
                  </Typography>
                  <Typography>{"Earnings Call"}</Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      {keyStatsLoading || keyStatsError ? (
        // || logoLoading || logoError
        <Box marginTop={3}>
          <Skeleton
            style={{ borderRadius: "10px" }}
            height={125}
            variant="rect"
          />
        </Box>
      ) : (
        renderDividendDate()
      )}
    </Box>
  );
}
