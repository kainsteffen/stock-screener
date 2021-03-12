import { useReactiveVar } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import { favoritesVar, toggleFavoritedSymbol } from "../../gql/local-state";

export interface FollowButtonProps {
  symbol: string;
}

export default function FollowButton(props: FollowButtonProps) {
  const favorites = useReactiveVar(favoritesVar);
  const isFavorited = favorites.includes(props.symbol);

  return (
    <Button
      onClick={() => toggleFavoritedSymbol(props.symbol)}
      variant={isFavorited ? "contained" : "outlined"}
      size="large"
      color="primary"
    >
      {isFavorited ? "Followed" : "Follow"}
    </Button>
  );
}
