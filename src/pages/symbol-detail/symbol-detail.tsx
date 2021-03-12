import { gql, useQuery, useReactiveVar } from "@apollo/client";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Skeleton } from "@material-ui/lab";
import numeral from "numeral";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PercentageChangeLabel from "../../components/percentage-change-label/percentage-change-label";
import { TimeSeriesPreviewChart } from "../../components/time-series-preview-chart/time-series-preview-chart";
import { favoritesVar, toggleFavoritedSymbol } from "../../gql/local-state";
import { COMPANY, FUNDAMENTALS, LOGO, QUOTE } from "../../gql/queries/shared";
import { parseIndicatorValue } from "../../helpers/numbers";

const useStyles = makeStyles({
  logo: {
    objectFit: "contain",
    width: 75,
    height: 75,
    borderRadius: "50%",
    backgroundColor: "white",
  },
  liked: {
    color: "#F50057",
  },
});

const HISTORICAL_PRICES = gql`
  query getHistoricalPrices($symbol: String!, $range: String!) {
    historicalPrices(symbol: $symbol, range: $range) {
      close
      date
    }
  }
`;

enum TimeRange {
  Today = "1d",
  Week = "5d",
  Month = "1m",
  Year = "1y",
}

export default function SymbolDetail() {
  const classes = useStyles();
  const { id: symbol } = useParams<{ id: string }>();
  const favorites = useReactiveVar(favoritesVar);
  const isFavorited = favorites.includes(symbol);
  const [selectedRange, setSelectedRange] = useState("1d");

  const {
    data: pricesData,
    loading: priceLoading,
    error: pricesError,
  } = useQuery(HISTORICAL_PRICES, {
    variables: {
      symbol: symbol,
      range: selectedRange,
    },
  });

  const {
    data: quoteData,
    loading: quoteLoading,
    error: quoteError,
  } = useQuery(QUOTE, {
    variables: {
      symbol: symbol,
    },
  });

  const { data: logoData, loading: logoLoading, error: logoError } = useQuery(
    LOGO,
    {
      variables: {
        symbol: symbol,
      },
    }
  );

  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useQuery(COMPANY, {
    variables: {
      symbol: symbol,
    },
  });

  const {
    data: fundamentalsData,
    loading: fundamentalsLoading,
    error: fundamentalsError,
  } = useQuery(FUNDAMENTALS, {
    variables: {
      symbol: symbol,
    },
  });

  return (
    <Container>
      <Card>
        <CardContent>
          <Box padding={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom={4}
            >
              <Box display="flex" alignItems="center">
                <Box width={75} height={75} marginRight={2}>
                  {logoLoading || logoError ? (
                    <Skeleton variant="circle" height="100%"></Skeleton>
                  ) : (
                    <img
                      src={logoData.logo.url}
                      className={classes.logo}
                      alt="logo"
                    />
                  )}
                </Box>
                <Box display="flex" flexDirection="column">
                  {quoteLoading || quoteError ? (
                    <React.Fragment>
                      <Skeleton width={100} height={30} />
                      <Skeleton width={150} height={50} />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography color="textSecondary">{symbol}</Typography>
                      <Typography variant="h5">
                        {quoteData.symbol.quote.companyName}
                      </Typography>
                    </React.Fragment>
                  )}
                </Box>
                <Box width="20px" />
              </Box>
              <Box display="flex" alignItems="center">
                <Button
                  onClick={() => toggleFavoritedSymbol(symbol)}
                  variant={isFavorited ? "contained" : "outlined"}
                  size="large"
                  color="primary"
                >
                  {isFavorited ? "Followed" : "Follow"}
                </Button>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              marginBottom={2}
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                {quoteLoading || quoteError ? (
                  <React.Fragment>
                    <Box marginRight={2}>
                      <Skeleton width={100} height={50} />
                    </Box>
                    <Skeleton width={100} height={50} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box marginRight={2}>
                      <Typography variant="h5">
                        $ {quoteData.symbol.quote.latestPrice}
                      </Typography>
                    </Box>

                    <PercentageChangeLabel
                      percentChange={quoteData.symbol.quote.changePercent}
                    />
                  </React.Fragment>
                )}
              </Box>

              <Box>
                <ButtonGroup>
                  {Object.entries(TimeRange).map((entry) => {
                    return (
                      <Button
                        key={entry[0]}
                        onClick={() => setSelectedRange(entry[1])}
                        variant={
                          selectedRange === entry[1] ? "contained" : "outlined"
                        }
                      >
                        {entry[0]}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Box>
            </Box>
            <Box position="relative" paddingTop={4} paddingBottom={4}>
              <Box width="100%" height={300} marginRight={2}>
                {priceLoading || pricesError ? (
                  <Skeleton variant="rect" height="100%" />
                ) : (
                  <TimeSeriesPreviewChart
                    data={pricesData.historicalPrices.map(
                      (item: any) => item.close
                    )}
                    labels={pricesData.historicalPrices.map(
                      (item: any) => item.date
                    )}
                  />
                )}
              </Box>
            </Box>
            <Typography variant="h5">General</Typography>
            <Box marginBottom={2} />
            {fundamentalsLoading ||
            fundamentalsError ||
            companyLoading ||
            companyError ? (
              <Box>
                <Grid container spacing={5} direction="row">
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={6} md={4} lg={2}>
                      <Skeleton height={50} />
                    </Grid>
                  ))}
                </Grid>
                <Grid container spacing={5} direction="row">
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={6} md={4} lg={2}>
                      <Skeleton height={50} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={5} direction="row">
                  {[
                    {
                      name: "52 week range",
                      value: fundamentalsData.fundamentals.fiftyTwoWeekRange,
                    },
                    {
                      name: "Market Cap",
                      value: `$${parseIndicatorValue(
                        fundamentalsData.fundamentals.marketCap,
                        "bigNumber"
                      )}`,
                    },
                    {
                      name: "P/E",
                      value: fundamentalsData.fundamentals.trailingPe,
                    },
                    {
                      name: "Dividend Yield",
                      value: numeral(
                        fundamentalsData.fundamentals.forwardDividendYield
                      ).format("0.00%"),
                    },
                  ].map((item) => (
                    <Grid item xs={6} md={4} lg={2}>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          {item.name}
                        </Typography>
                        <Typography>{item.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Grid container spacing={5} direction="row">
                  {[
                    {
                      name: "CEO",
                      value: companyData.company.CEO,
                    },
                    {
                      name: "Country",
                      value: companyData.company.country,
                    },
                    {
                      name: "Sector",
                      value: companyData.company.sector,
                    },
                    {
                      name: "Employees",
                      value: companyData.company.employees,
                    },
                  ].map((item) => (
                    <Grid item xs={6} md={4} lg={2}>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          {item.name}
                        </Typography>
                        <Typography>{item.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            <Box height="30px" />
            {companyLoading || companyError ? (
              <div>busy</div>
            ) : (
              <Box>
                <Typography>{companyData.company.description}</Typography>
              </Box>
            )}

            <Box height="20px" />
            <Typography variant="h5">Indicators</Typography>
            <Box marginBottom={2} />
            <Grid container spacing={3}>
              {[
                {
                  parameter: "Market Cap",
                  value: "221.50 B",
                  valuation: "buy",
                },
                { parameter: "P/E Ratio", value: "34,58", valuation: "sell" },
                {
                  parameter: "52-Week-High",
                  value: "221.50 B",
                  valuation: "buy",
                },
                { parameter: "EPS", value: "6,20", valuation: "buy" },
                {
                  parameter: "Volume",
                  value: "24.666.039",
                  valuation: "sell",
                },
                {
                  parameter: "Beta",
                  value: "0,82",
                  valuation: "sell",
                },
                {
                  parameter: "Dividends",
                  value: "2,24 (1,05%)",
                  valuation: "buy",
                },
                {
                  parameter: "Ex-Dividend Date",
                  value: "16. Feb. 2021",
                  valuation: "sell",
                },
              ].map((item) => (
                <Grid
                  key={item.parameter}
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      width="5px"
                      height="50px"
                      bgcolor={item.valuation === "buy" ? "#41CE3E" : "red"}
                      marginRight="10px"
                      borderRadius="10px"
                    />
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {item.parameter}
                      </Typography>
                      <Typography variant="h6">{item.value}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
