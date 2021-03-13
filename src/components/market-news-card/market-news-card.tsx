import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { format } from "date-fns";
import React from "react";

const useStyles = makeStyles({
  dailyChange: {
    color: "#41CE3E",
  },
  media: {
    height: 140,
    backgroundColor: "lightgrey",
  },
  maxLine: {
    maxLines: 4,
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxHeight: "96px",
  },
});

const NEWS = gql`
  query getNews($symbol: String!, $last: Int!) {
    news(symbol: $symbol, last: $last) {
      datetime
      headline
      source
      url
      summary
      related
      image
      lang
      hasPaywall
    }
  }
`;

export interface MarketNewsCardProps {
  symbol: string;
}

export default function MarketNewsCard(props: MarketNewsCardProps) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(NEWS, {
    variables: { symbol: props.symbol, last: 1 },
  });

  const openLink = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <React.Fragment>
      {loading || error ? (
        <Skeleton
          style={{ borderRadius: "10px" }}
          height={342}
          variant="rect"
        />
      ) : (
        <Card>
          <CardActionArea href={`/symbols/${props.symbol}`}>
            <CardMedia
              className={classes.media}
              image={data.news[0].image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={1}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="inline"
                >
                  {props.symbol}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="inline"
                >
                  {format(new Date(data.news[0].datetime), "MM/dd/yyyy")}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.maxLine}
              >
                {data.news[0].summary}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box width="100%" display="flex" justifyContent="flex-end">
              <Button
                onClick={() => openLink(data.news[0].url)}
                size="small"
                color="primary"
              >
                Read
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  );
}
