import { Box, Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
    dailyChange: {
        color: '#41CE3E'
    },
});


export default function TrendingStockCard() {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea href='stock'>
                <CardContent>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Typography variant='h6' display='inline'>
                            MSFT
                        </Typography>
                        <Typography variant='body1' display='inline' className={classes.dailyChange}>
                            10.32 %
                        </Typography>
                    </Box>
                    <Typography variant='h5'>
                        $ 117.80
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        52w range
                    </Typography>
                    <Typography variant='subtitle1'>
                        90.90 - 169.30
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

