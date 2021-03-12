import { useQuery } from "@apollo/client";
import { Box, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { LOGO } from "../../gql/queries/shared";

const useStyles = makeStyles({
  logo: {
    objectFit: "contain",
    width: "40px",
    height: "40px",
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
    const checkUrl = async () => {
      try {
        await Axios.get(data.logo.url);
        setImageValid(true);
      } catch (e) {
        setImageValid(false);
      }
    };

    if (data?.logo?.url) {
      checkUrl();
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
