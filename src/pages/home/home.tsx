import { useReactiveVar } from "@apollo/client";
import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import DashboardElement from "../../components/dashboard-element/dashboard-element";
import EventCard from "../../components/event-date-card/event-date-card";
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

                {/* <Typography variant="h6" gutterBottom>
                  Trending
                </Typography> */}
                {/* <Grid container spacing={3} direction="row">
                  {favorites.length > 0 ? (
                    favorites.map((symbol, index) => {
                      if (index < 6) {
                        return (
                          <Grid
                            key={symbol}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={2}
                          >
                            <TrendingStockCard symbol={symbol} />
                          </Grid>
                        );
                      } else {
                        return null;
                      }
                    })
                  ) : (
                    <Grid item xs={12} md={8} lg={3}>
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
                </Grid> */}
              </Box>
            );
          case "upcomingEvents":
            return (
              <Box key={dashboardElement.key} marginBottom={4}>
                <DashboardElement
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  name={dashboardElement.name}
                  renderChild={(symbol: string) => (
                    <EventCard symbol={symbol} eventType="earnings" />
                  )}
                />

                {/* <Typography variant="h6" gutterBottom>
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
                </Grid> */}
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

                {/* <Typography variant="h6" gutterBottom>
                  Market News
                </Typography>
                <Grid container spacing={3} direction="row">
                  {favorites.map((symbol) => (
                    <Grid key={symbol} item xs={12} sm={6} md={4} lg={3} xl={3}>
                      <MarketNewsCard symbol={symbol} />
                    </Grid>
                  ))}
                </Grid> */}
              </Box>
            );
        }
      }
    });
  };
  return <Container>{renderDashboardElements()}</Container>;
}
