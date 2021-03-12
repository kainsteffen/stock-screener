import { useReactiveVar } from "@apollo/client";
import {
  Box,
  ButtonBase,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useHistory } from "react-router-dom";
import StrategyCard from "../../components/strategy-card/strategy-card";
import { strategiesVar } from "../../gql/local-state";

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      position: "fixed",
      right: theme.spacing(5),
      bottom: theme.spacing(5),
    },
    addNewStrategy: {
      width: "100%",
      height: "100%",
      color: "grey",
      border: "1px dashed",
      borderRadius: "8px",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        color: "white",
      },
    },
  })
);

export default function Strategies() {
  const classes = useStyles();
  const history = useHistory();
  const strategies = useReactiveVar(strategiesVar);

  const onAdd = () => {
    history.push(`${history.location.pathname}/create`);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={3}>
          <Box height="100%">
            <ButtonBase className={classes.addNewStrategy} onClick={onAdd}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={2}
              >
                <AddIcon />
                <Typography>Add new Strategy</Typography>
              </Box>
            </ButtonBase>
          </Box>
        </Grid>
        {strategies.ids.sort().map((id) => {
          return (
            <Grid key={id} item xs={12} md={8} lg={3}>
              <StrategyCard strategyId={id} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
