import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import TabButtonBar from "../../components/tab-button-bar/tab-button-bar";
import { TimeSeriesPreviewChart } from "../../components/time-series-preview-chart/time-series-preview-chart";

const useStyles = makeStyles({
  logo: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    marginRight: 10,
  },
});

export default function StockDetail() {
  const classes = useStyles();

  return (
    <Container>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <img
                src="//logo.clearbit.com/microsoft.com?size=100"
                className={classes.logo}
                alt="logo"
              />
              <Box display="flex" flexDirection="column">
                <Typography>MSFT</Typography>
                <Typography variant="h5">Microsoft</Typography>
              </Box>
              <Box width="20px" />
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">$214,36</Typography>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
          <Box width="75%">
            <TimeSeriesPreviewChart
              data={[
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
                Math.random() > 0.5 ? Math.random() * 10 : Math.random() * -10,
              ]}
            />
          </Box>

          <Box display="flex">
            <Typography variant="h6">Valuation |</Typography>
            <Box width="10px"></Box>
            <Box
              display="inline-block"
              padding="5px"
              minWidth="60px"
              borderRadius="10px"
              bgcolor="#41CE3E"
              color="white"
            >
              <Box display="flex" justifyContent="center">
                <Typography>Buy</Typography>
              </Box>
            </Box>
          </Box>
          <Box height="30px" />
          <TabButtonBar
            options={[
              "Dividend Growth",
              "Growth",
              "Value",
              "Quality",
              "Momentum",
              "Low Volatility",
              "Dividend Growth",
              "Growth",
              "Value",
              "Quality",
              "Momentum",
              "Low Volatility",
            ]}
          />
          <Box height="20px" />
          <Grid container spacing={3}>
            {[
              { parameter: "Market Cap", value: "221.50 B", valuation: "buy" },
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
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
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
        </CardContent>
      </Card>
    </Container>
  );
}
