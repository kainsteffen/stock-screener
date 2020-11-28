import { Box, Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    dailyChange: {
        color: '#41CE3E'
    },
    fillParent: {
        width: '100%',
        height: '100%'
    },
});

export default function StrategyCard() {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea href='/strategies/create'>
                <CardContent className={classes.fillParent}>
                    <Typography variant='h6'>
                        Dividend Growth Investing
                    </Typography>
                    <Box paddingY={1}>
                        <Typography color='textSecondary'>
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                    </Typography>
                    </Box>
                    <Typography>
                        1101 Stocks found
                    </Typography>
                    <Typography>
                        21 Indicators
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

