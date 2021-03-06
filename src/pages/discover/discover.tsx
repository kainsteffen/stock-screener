import { gql, useQuery, useReactiveVar } from "@apollo/client";
import {
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import SymbolTableRow from "../../components/symbol-table-row/symbol-table-row";
import TabButtonBar from "../../components/tab-button-bar/tab-button-bar";
import { favoritesVar, strategiesVar } from "../../gql/local-state";
import { strategyToMdbQuery } from "../../services/mongodb-parser";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  likeButton: {
    color: "#F50057",
  },
});

const STRATEGY_RESULTS = gql`
  query getStrategyResults($filter: String!) {
    fundamentalsFilter(filter: $filter) {
      symbol
      name
      marketCap
      trailingPe
    }
  }
`;

export default function Discover() {
  const classes = useStyles();
  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const strategies = useReactiveVar(strategiesVar);
  const favorites = useReactiveVar(favoritesVar);
  const strategy = strategies.entities[strategies.ids[selectedStrategy]];

  const { data, loading, error } = useQuery(STRATEGY_RESULTS, {
    variables: {
      filter: strategyToMdbQuery(strategy),
    },
  });

  if (!strategy) return <p>Empty</p>;
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>Not found</p>;

  const indicators = strategy.indicators;

  return (
    <Container>
      <TabButtonBar
        selected={selectedStrategy}
        onSelect={(index: number) => setSelectedStrategy(index)}
        options={strategies.ids.map(
          (id: number) => strategies.entities[id].name
        )}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col width="1%" />
            <col width="5%" />
            {indicators.map((indicator) => (
              <col key={indicator.key} width="5%" />
            ))}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell key="like"></TableCell>
              <TableCell key="ticker">Ticker</TableCell>
              <TableCell key="price" align="right">
                Price
              </TableCell>
              <TableCell key="today" align="right">
                Today
              </TableCell>
              {indicators.map((indicator) => (
                <TableCell key={indicator.key} align="right">
                  {indicator.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.fundamentalsFilter.map((symbol: any) => (
              <SymbolTableRow
                key={symbol.symbol}
                symbol={symbol}
                indicators={indicators}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
