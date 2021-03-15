import { gql, useQuery } from "@apollo/client";
import { Box, List, ListItem, Popover, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const SEARCH_RESULTS = gql`
  query getSearchResults($searchTerm: String!) {
    searchSymbols(searchTerm: $searchTerm) {
      symbol
      name
    }
  }
`;

export interface SearchResultsPopoverProps {
  open: boolean;
  searchTerm: string;
}

export default function SearchResultsPopover(props: SearchResultsPopoverProps) {
  const anchor = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  // TODO: Fix this workaround for waiting on the anchor to be set
  const [refVisible, setRefVisible] = useState(false);
  useEffect(() => {
    if (!refVisible) {
      return;
    }
  }, [refVisible]);

  const { data, loading, error } = useQuery(SEARCH_RESULTS, {
    variables: {
      searchTerm: props.searchTerm,
    },
  });

  useEffect(() => {}, []);

  if (loading || error) return null;
  return (
    <React.Fragment>
      <div
        ref={(el) => {
          anchor.current = el;
          setRefVisible(!!el);
        }}
        style={{ position: "absolute", top: "65px" }}
      />
      {anchor.current && (
        <Popover
          open={props.open && data.searchSymbols.length > 0}
          anchorEl={anchor.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableAutoFocus
          disableEnforceFocus
        >
          <List>
            {data.searchSymbols.map((item: any) => (
              <ListItem
                key={item.symbol}
                button
                onClick={() => history.replace(`/symbols/${item.symbol}`)}
              >
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    {item.symbol}
                  </Typography>
                  <Typography>{item.name}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </React.Fragment>
  );
}
