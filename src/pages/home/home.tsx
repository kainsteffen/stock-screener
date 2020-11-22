import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import TrendingStockCard from '../../components/trending-stock-card/trending-stock-card';

export default function Home() {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <TrendingStockCard />
                </Grid>
            </Grid>
        </Container>
    );
}

