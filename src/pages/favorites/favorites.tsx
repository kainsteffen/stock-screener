import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { TimeSeriesPreviewChart } from "../../components/time-series-preview-chart/time-series-preview-chart";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  likeButton: {
    color: "#F50057",
  },
});

function createData(
  name: string,
  ticker: string,
  price: number,
  today: number,
  exDividend: string,
  fairValue: number
) {
  return { name, ticker, price, today, exDividend, fairValue };
}

const rows = [
  createData("Apple", "AAPL", 120.76, 2.32, "21.12.2020", 4.0),
  createData("Microsoft", "MSFT", 224.71, -1.65, "21.12.2020", 4.3),
  createData("Amazon", "AMZN", 3243.01, 0.48, "23.05.2020", 4.3),
  createData("Facebook", "FB", 288.37, -5.87, "08.03.2020", 3.9),
];

export default function Favorites() {
  const classes = useStyles();

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col width="2%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="15%" />
            <col width="5%" />
            <col width="5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Today</TableCell>
              <TableCell align="left">Daily Chart</TableCell>
              <TableCell align="left">Ex-Dividend</TableCell>
              <TableCell align="left">Fair Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <IconButton>
                    <FavoriteIcon className={classes.likeButton} />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      {row.ticker}
                    </Typography>
                    <Typography>{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">$ {row.price}</TableCell>
                <TableCell align="left">{row.today}%</TableCell>
                <TableCell align="left">
                  <TimeSeriesPreviewChart
                    data={[
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                      Math.random() > 0.5
                        ? Math.random() * 10
                        : Math.random() * -10,
                    ]}
                  />
                </TableCell>
                <TableCell align="left">{row.exDividend}</TableCell>
                <TableCell align="left">{row.fairValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
