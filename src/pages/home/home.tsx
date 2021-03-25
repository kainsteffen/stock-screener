import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import DashboardElement from "../../components/dashboard-element/dashboard-element";
import EventCard from "../../components/event-date-card/event-date-card";
import IndexCard from "../../components/index-card/index-card";
import MarketNewsCard from "../../components/market-news-card/market-news-card";
import TrendingStockCard from "../../components/trending-stock-card/trending-stock-card";
import { dashboardElementsVar, favoritesVar } from "../../gql/local-state";

const useStyles = makeStyles({
  emptyPrompt: {
    width: "100%",
    height: "100%",
    color: "grey",
    border: "1px dashed",
    borderRadius: "8px",
  },
});

export default function Home() {
  const classes = useStyles();
  const favorites = useReactiveVar(favoritesVar);
  const dashboardElements = useReactiveVar(dashboardElementsVar);

  const renderDashboardElements = () => {
    return dashboardElements.map((dashboardElement) => {
      if (dashboardElement.selected) {
        switch (dashboardElement.key) {
          case "followed":
            return (
              <Box key={dashboardElement.key} marginBottom={4}>
                <DashboardElement
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  name={dashboardElement.name}
                  renderChild={(symbol: string) => (
                    <TrendingStockCard symbol={symbol} />
                  )}
                />
              </Box>
            );
          case "trending":
            return (
              <Box key={dashboardElement.key} marginBottom={4}>
                <DashboardElement
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  name={dashboardElement.name}
                  renderChild={(symbol: string) => (
                    <TrendingStockCard symbol={symbol} />
                  )}
                />
              </Box>
            );
          case "upcomingEvents":
            return (
              <Box key={dashboardElement.key} marginBottom={4}>
                <DashboardElement
                  xs={6}
                  sm={6}
                  md={4}
                  lg={2}
                  xl={3}
                  name={dashboardElement.name}
                  renderChild={(symbol: string) => (
                    <EventCard symbol={symbol} eventType="earnings" />
                  )}
                />
              </Box>
            );
          case "marketNews":
            return (
              <Box key={dashboardElement.key} marginBottom={4}>
                <DashboardElement
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  name={dashboardElement.name}
                  renderChild={(symbol: string) => (
                    <MarketNewsCard symbol={symbol} />
                  )}
                />
              </Box>
            );
        }
      }
    });
  };
  return (
    <Container>
      {dashboardElements.find(
        (item) => item.key === "markets" && item.selected
      ) && (
        <Box marginBottom={4}>
          <Typography variant="h6" gutterBottom>
            Markets
          </Typography>
          <Grid container spacing={3} direction="row">
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
              <IndexCard symbol="VOO" name={"S&P 500"} />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
              <IndexCard symbol="DIA" name={"Dow 30"} />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
              <IndexCard symbol="IWM" name={"Russell 2000"} />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
              <IndexCard symbol="QQQ" name={"Nasdaq 100"} />
            </Grid>
          </Grid>
        </Box>
      )}

      {renderDashboardElements()}
    </Container>
  );
}
