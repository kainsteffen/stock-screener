import { Box, Container, Grid, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import EarningsDateCard from "../../components/earnings-date-card/earnings-date-card";
import MarketNewsCard from "../../components/market-news-card/market-news-card";
import TrendingStockCard from "../../components/trending-stock-card/trending-stock-card";

export default function Home() {
  useEffect(
    //NGGEXSKHJXYR1H3R
    () => {
      Axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "OVERVIEW",
          symbol: "IBM",
          apikey: "demo",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );

  const symbols = ["AAPL", "MSFT", "AMZN", "FB", "GOOG", "TSLA"];

  return (
    <Container>
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        <Grid container spacing={3} direction="row">
          <Grid item xs={6} md={4} lg={3}>
            <EarningsDateCard
              imgSrc="//logo.clearbit.com/apple.com?size=100"
              ticker="AAPL"
              name="Apple Earnings Call"
              date="Dec 16 2020"
              expectedEPS={2.51}
              currentEPS={3.2}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <EarningsDateCard
              imgSrc="//logo.clearbit.com/microsoft.com?size=100"
              ticker="MSFT"
              name="Microsoft Earnings Call"
              date="Dec 05 2020"
              expectedEPS={3.31}
              currentEPS={4.31}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <EarningsDateCard
              imgSrc="//logo.clearbit.com/amazon.com?size=100"
              ticker="AMZN"
              name="Amazon General Assembly"
              date="Dec 05 2020"
              expectedEPS={1.11}
              currentEPS={2.76}
            />
          </Grid>
        </Grid>
      </Box>

      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Trending
        </Typography>
        <Grid container spacing={3} direction="row">
          {symbols &&
            symbols.map((symbol) => (
              <Grid key={symbol} item xs={6} md={8} lg={2}>
                <TrendingStockCard symbol={symbol} />
              </Grid>
            ))}
        </Grid>
      </Box>

      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Market News
        </Typography>
        <Grid container spacing={3} direction="row">
          {symbols &&
            symbols.map((symbol) => (
              <Grid key={symbol} item xs={6} md={8} lg={3}>
                <MarketNewsCard symbol={symbol} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}
