import { gql, useQuery } from "@apollo/client";
import {
  Box,
  CircularProgress,
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
import React, { useEffect, useRef, useState } from "react";
import SymbolTableRow from "../../components/symbol-table-row/symbol-table-row";
import { Strategy } from "../../gql/local-state";
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
  query getStrategyResults($filter: String!, $cursor: Int!, $limit: Int!) {
    strategyResults(filter: $filter, cursor: $cursor, limit: $limit) {
      symbol
      name
      marketCap
      trailingPE
    }
  }
`;

export interface SymbolTableProps {
  strategy: Strategy;
  cursor: number;
  onSetCursor: (cursor: number) => void;
}

export default function SymbolTable(props: SymbolTableProps) {
  const classes = useStyles();
  const loader = useRef(document.createElement("div"));
  const [fetching, setFetching] = useState(false);
  const limit = 10;
  const { data, loading, error, fetchMore } = useQuery(STRATEGY_RESULTS, {
    variables: {
      filter: strategyToMdbQuery(props.strategy),
      cursor: props.cursor,
      limit: limit,
    },
  });

  const indicators = props.strategy.indicators;

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(onScrollEnter, options);
    if (loader && loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [props.strategy, props.cursor]);

  const onScrollEnter = async (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      onFetch(limit);
    }
  };

  const onFetch = (limit: number) => {
    setFetching(true);
    if (fetchMore == null) return;
    fetchMore({
      variables: {
        filter: strategyToMdbQuery(props.strategy),
        cursor: props.cursor,
        limit: limit,
      },
    }).then((results) => {
      if (results.data.strategyResults.length > 0) {
        props.onSetCursor(limit);
      }
      setFetching(false);
    });
  };

  return (
    <Container>
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

          {loading && <p>Loading</p>}
          {error && <p>Error</p>}
          {!data && <p>Not found</p>}
          {data && (
            <TableBody>
              {data.strategyResults.map(
                (symbol: any, index: number, array: any) => {
                  if (index + 1 === array.length) {
                    return (
                      <React.Fragment key={symbol.symbol}>
                        <SymbolTableRow
                          key={symbol.symbol}
                          symbol={symbol}
                          indicators={indicators}
                        />
                      </React.Fragment>
                    );
                  }

                  return (
                    <SymbolTableRow
                      key={symbol.symbol}
                      symbol={symbol}
                      indicators={indicators}
                    />
                  );
                }
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <div ref={loader}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={150}
        >
          <div style={{ visibility: fetching ? "visible" : "hidden" }}>
            <CircularProgress />
          </div>
        </Box>
      </div>
    </Container>
  );
}
