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
import React from "react";

const useStyles = makeStyles({
  dailyChange: {
    color: "#41CE3E",
  },
  media: {
    height: 140,
    backgroundColor: "lightgrey",
  },
});

export default function MarketNewsCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea href="stock">
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={1}
          >
            <Typography variant="body2" color="textSecondary" display="inline">
              MSFT
            </Typography>
            <Typography variant="body2" color="textSecondary" display="inline">
              5h ago
            </Typography>
          </Box>
          <Typography variant="body1" color="textSecondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read
        </Button>
        <Button size="small" color="primary">
          Dismiss
        </Button>
      </CardActions>
    </Card>
  );
}
