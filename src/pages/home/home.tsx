import { useReactiveVar } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import EventCard from "../../components/event-date-card/event-date-card";
import MarketNewsCard from "../../components/market-news-card/market-news-card";
import TrendingStockCard from "../../components/trending-stock-card/trending-stock-card";
import { dashboardElementsVar, favoritesVar } from "../../gql/local-state";

export default function Home() {
  const favorites = useReactiveVar(favoritesVar);
  const dashboardElements = useReactiveVar(dashboardElementsVar);

  const renderDashboardElements = () => {
    return dashboardElements.map((dashboardElement) => {
      if (dashboardElement.selected) {
        switch (dashboardElement.key) {
          case "trending":
            return (
              <Box marginBottom={3}>
                <Typography variant="h6" gutterBottom>
                  Trending
                </Typography>
                <Grid container spacing={3} direction="row">
                  {favorites.map((symbol) => (
                    <Grid key={symbol} item xs={12} sm={6} md={4} lg={3} xl={2}>
                      <TrendingStockCard symbol={symbol} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          case "upcomingEvents":
            return (
              <Box marginBottom={3}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <Grid container spacing={3} direction="row">
                  {favorites.map((favorite) => (
                    <EventCard
                      key={favorite}
                      symbol={favorite}
                      eventType="earnings"
                    />
                  ))}
                </Grid>
              </Box>
            );
          case "marketNews":
            return (
              <Box marginBottom={3}>
                <Typography variant="h6" gutterBottom>
                  Market News
                </Typography>
                <Grid container spacing={3} direction="row">
                  {favorites.map((symbol) => (
                    <Grid key={symbol} item xs={12} sm={6} md={4} lg={3} xl={3}>
                      <MarketNewsCard symbol={symbol} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
        }
      }
    });
  };
  return <Container>{renderDashboardElements()}</Container>;
}
