import { Box, Container, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect } from 'react';
import MarketNewsCard from '../../components/market-news-card/market-news-card';
import TrendingStockCard from '../../components/trending-stock-card/trending-stock-card';

export default function Home() {
    useEffect(//NGGEXSKHJXYR1H3R
        () => {
            Axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'OVERVIEW',
                    symbol: 'IBM',
                    apikey: 'demo'
                }
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error)
            });
        }
    );

    return (
        <Container>
            <Box marginBottom={3}>

                <Typography variant='h6' gutterBottom>
                    Trending
                </Typography>

                <Grid container spacing={3} direction='row'>
                    <Grid item xs={6} md={8} lg={2}>
                        <TrendingStockCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={2}>
                        <TrendingStockCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={2}>
                        <TrendingStockCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={2}>
                        <TrendingStockCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={2}>
                        <TrendingStockCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={2}>
                        <TrendingStockCard />
                    </Grid>
                </Grid>
            </Box>

            <Box marginBottom={3}>
                <Typography variant='h6' gutterBottom>
                    Market News
                </Typography>
                <Grid container spacing={3} direction='row'>
                    <Grid item xs={6} md={8} lg={3}>
                        <MarketNewsCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={3}>
                        <MarketNewsCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={3}>
                        <MarketNewsCard />
                    </Grid>
                    <Grid item xs={6} md={8} lg={3}>
                        <MarketNewsCard />
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
}

