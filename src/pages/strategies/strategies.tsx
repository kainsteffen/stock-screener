import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import StrategyCard from '../../components/strategy-card/strategy-card';

export default function Strategies() {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <StrategyCard />
                </Grid>
            </Grid>
        </Container>
    );
}