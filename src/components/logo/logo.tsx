import { useQuery } from "@apollo/client";
import { Box, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { LOGO } from "../../gql/queries/shared";

const useStyles = makeStyles({
  logo: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
    // width: "40px",
    // height: "40px",
    borderRadius: "100%",
    backgroundColor: "white",
  },
});

export interface LogoPros {
  symbol: string;
  width: number | string;
  height: number | string;
}

export default function Logo(props: LogoPros) {
  const classes = useStyles();
  const [imageValid, setImageValid] = useState(false);

  const { data, loading, error } = useQuery(LOGO, {
    variables: {
      symbol: props.symbol,
    },
  });

  useEffect(() => {
    if (data?.logo?.url) {
      const img = new Image();
      img.onload = () => setImageValid(true);
      img.onerror = () => setImageValid(false);
      img.src = data.logo.url;
    }
  });

  return (
    <Box width={props.width} height={props.height}>
      {loading || error || !imageValid ? (
        <Skeleton variant="circle" width={props.width} height={props.height} />
      ) : (
        <img src={data.logo.url} className={classes.logo} alt="logo" />
      )}
    </Box>
  );
}
