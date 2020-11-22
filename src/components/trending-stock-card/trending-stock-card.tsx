import { ButtonBase, Card, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function TrendingStockCard() {
    const goToStockDetail = () => {
        console.log("hello world");
    }

    return (
        <Card>
            <ButtonBase component='a' href='stock' onClick={goToStockDetail}>
                <CardContent>
                    <Typography>
                        MSFT
                </Typography>
                    <Typography>
                        $ 117.80
                </Typography>
                    <Typography>
                        52w range
                </Typography>
                    <Typography>
                        90.90 - 169.30
                </Typography>
                </CardContent>
            </ButtonBase>
        </Card>
    );
}

