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
import FollowButton from "../../components/follow-button/follow-button";
import { InfoButton } from "../../components/info-button/info-button";
import Logo from "../../components/logo/logo";
import PercentageChangeLabel from "../../components/percentage-change-label/percentage-change-label";
import TabButtonBar from "../../components/tab-button-bar/tab-button-bar";
import { TimeSeriesPreviewChart } from "../../components/time-series-preview-chart/time-series-preview-chart";
import { strategiesVar } from "../../gql/local-state";
import { COMPANY, FUNDAMENTALS, QUOTE } from "../../gql/queries/shared";
import { parseIndicatorValue } from "../../helpers/numbers";

const useStyles = makeStyles({});

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
  const [selectedRange, setSelectedRange] = useState("1d");
  const strategies = useReactiveVar(strategiesVar);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies.ids[0]);
  const indicators = strategies.entities[selectedStrategy].indicators;

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
                <Box marginRight={2}>
                  <Logo symbol={symbol} width={75} height={75} />
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
              <FollowButton symbol={symbol} />
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
            <Typography variant="h5">About</Typography>
            <Box marginBottom={2} />
            {fundamentalsLoading ||
            fundamentalsError ||
            companyLoading ||
            companyError ? (
              <Box>
                <Grid container spacing={5} direction="row">
                  {[1, 2, 3, 4].map((item) => (
                    <Grid key={item} item xs={6} md={4} lg={2}>
                      <Skeleton height={50} />
                    </Grid>
                  ))}
                </Grid>
                <Grid container spacing={5} direction="row">
                  {[1, 2, 3, 4].map((item) => (
                    <Grid key={item} item xs={6} md={4} lg={2}>
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
                      value:
                        fundamentalsData.fundamentals.fiftyTwoWeekRange ?? "-",
                    },
                    {
                      name: "Market Cap",
                      value: `$${parseIndicatorValue(
                        fundamentalsData.fundamentals.marketCap ?? "-",
                        "bigNumber"
                      )}`,
                    },
                    {
                      name: "P/E",
                      value: fundamentalsData.fundamentals.trailingPE ?? "-",
                    },
                    {
                      name: "Dividend Yield",
                      value:
                        numeral(
                          fundamentalsData.fundamentals
                            .forwardAnnualDividendYield
                        ).format("0.00%") ?? "-",
                    },
                  ].map((item) => (
                    <Grid key={item.name} item xs={6} md={4} lg={2}>
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
                      value: companyData.company.CEO ?? "-",
                    },
                    {
                      name: "Country",
                      value: companyData.company.country ?? "-",
                    },
                    {
                      name: "Sector",
                      value: companyData.company.sector ?? "-",
                    },
                    {
                      name: "Employees",
                      value: companyData.company.employees ?? "-",
                    },
                  ].map((item) => (
                    <Grid key={item.name} item xs={6} md={4} lg={2}>
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
              <Skeleton variant="rect" height={240} />
            ) : (
              <Box>
                <Typography>{companyData.company.description}</Typography>
              </Box>
            )}
            <Box height="30px" />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="h5">Indicators</Typography>
              <Box
                display="flex"
                width="70%"
                justifyContent="flex-end"
                alignItems="center"
              >
                <TabButtonBar
                  selected={selectedStrategy}
                  onSelect={(value: any) => setSelectedStrategy(value)}
                  options={strategies.ids.map((id: number) => ({
                    name: strategies.entities[id].name,
                    value: id,
                  }))}
                />
              </Box>
            </Box>
            <Box marginBottom={2} />
            <Grid container spacing={3}>
              {fundamentalsLoading || fundamentalsError ? (
                <Skeleton />
              ) : (
                indicators.map((indicator) => {
                  const indicatorValue = parseIndicatorValue(
                    fundamentalsData.fundamentals[indicator.key],
                    indicator.valueType
                  );
                  return (
                    <Grid
                      key={indicator.key}
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      xl={3}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box display="flex" alignItems="center">
                          <Box
                            width="7px"
                            height="50px"
                            bgcolor="#41CE3E"
                            marginRight="10px"
                            borderRadius="100px"
                          />
                          {/* <Box marginRight={2}>
                            <CircularProgress
                              variant="determinate"
                              value={Math.random() * 100}
                            />
                          </Box> */}
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              {indicator.name}
                            </Typography>
                            <Typography variant="h6">
                              {indicatorValue ?? "-"}
                            </Typography>
                          </Box>
                        </Box>
                        <InfoButton
                          title={indicator.name}
                          description={indicator.description}
                          url={indicator.investopediaUrl}
                        />
                      </Box>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
