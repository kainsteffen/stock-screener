import { Container, createStyles, Fab, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import StrategyCard from '../../components/strategy-card/strategy-card';

const useStyles = makeStyles((theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            right: theme.spacing(5),
            bottom: theme.spacing(5)
        }
    })
);

export default function Strategies() {
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <StrategyCard />
                </Grid>
            </Grid>
            <Fab size='large' color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </Container>
    );
}