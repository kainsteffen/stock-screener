import { useReactiveVar } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import EventCard from "../../components/event-date-card/event-date-card";
import MarketNewsCard from "../../components/market-news-card/market-news-card";
import TrendingStockCard from "../../components/trending-stock-card/trending-stock-card";
import { favoritesVar } from "../../gql/local-state";

export default function Home() {
  const favorites = useReactiveVar(favoritesVar);
  // useEffect(
  //   //NGGEXSKHJXYR1H3R
  //   () => {
  //     Axios.get("https://www.alphavantage.co/query", {
  //       params: {
  //         function: "OVERVIEW",
  //         symbol: "IBM",
  //         apikey: "demo",
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // );
  console.log(favorites);
  const symbols = ["AAPL", "MSFT", "AMZN", "FB", "GOOG", "TSLA"];

  return (
    <Container>
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
          Upcoming Events
        </Typography>
        <Grid container spacing={3} direction="row">
          {favorites.map((favorite) => (
            <React.Fragment>
              <EventCard symbol={favorite} eventType="earnings" />
            </React.Fragment>
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
