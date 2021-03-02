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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  likeButton: {
    color: "#F50057",
  },
});

function createData(
  liked: boolean,
  name: string,
  ticker: string,
  price: number,
  today: number,
  valuation: "buy" | "sell",
  dividendYield: number,
  dividendsPaid: number,
  payoutRatio: number,
  exDividendDate: string
) {
  return {
    liked,
    name,
    ticker,
    price,
    today,
    valuation,
    dividendYield,
    dividendsPaid,
    payoutRatio,
    exDividendDate,
  };
}

const rows = [
  createData(
    true,
    "Apple",
    "AAPL",
    122.25,
    -0.56,
    "buy",
    0.67,
    0.82,
    24.24,
    "05.11.2020"
  ),
  createData(
    true,
    "Microsoft",
    "MSFT",
    122.94,
    0.06,
    "buy",
    1.05,
    2.24,
    32.9,
    "16.02.2021"
  ),
  createData(
    false,
    "AT & T",
    "T",
    29.54,
    1.06,
    "buy",
    7.12,
    2.08,
    137.75,
    "07.10.2020"
  ),
  createData(
    true,
    "Amazon",
    "AMZN",
    3186.73,
    0.76,
    "sell",
    3.32,
    90.32,
    23.32,
    "02.06.2020"
  ),
  createData(
    true,
    "Facebook",
    "FB",
    279.7,
    0.76,
    "buy",
    1.2,
    2.89,
    34.32,
    "15.01.2020"
  ),
  createData(
    false,
    "Costco Wholesale Corporation",
    "COST",
    373.43,
    0.17,
    "sell",
    7.12,
    2.08,
    29.93,
    "30.11.2020"
  ),
];

export default function Discover() {
  const classes = useStyles();

  return (
    <Container>
      {/* <TabButtonBar
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
      /> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col width="1%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Today</TableCell>
              <TableCell align="right">Valuation</TableCell>
              <TableCell align="right">Dividend Yield</TableCell>
              <TableCell align="right">Dividend Paid</TableCell>
              <TableCell align="right">Payout Ratio</TableCell>
              <TableCell align="right">Ex-Dividend Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <IconButton>
                    <FavoriteIcon
                      className={row.liked ? classes.likeButton : ""}
                    />
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
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.today}%</TableCell>
                <TableCell align="right">
                  <Box
                    display="inline-block"
                    minWidth="60px"
                    padding="5px"
                    color="white"
                    bgcolor={row.valuation === "buy" ? "green" : "red"}
                    borderRadius="10px"
                  >
                    <Box display="flex" justifyContent="center">
                      {row.valuation === "buy" ? (
                        <Typography>Buy</Typography>
                      ) : (
                        <Typography>Sell</Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{row.dividendYield}%</TableCell>
                <TableCell align="right">${row.dividendsPaid}</TableCell>
                <TableCell align="right">{row.payoutRatio}%</TableCell>
                <TableCell align="right">{row.exDividendDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
