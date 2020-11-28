import { Container, Grid, Paper } from "@material-ui/core";
import React from "react";

export default function Watchlist() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper>
            <div>Watchlist</div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
