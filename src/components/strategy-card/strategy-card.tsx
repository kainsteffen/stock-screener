import { ButtonBase, Card, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function StrategyCard() {
    return (
        <Card>
            <ButtonBase component='a' href='strategy'>
                <CardContent>
                    <Typography>
                        Dividend Growth Investing
                    </Typography>
                    <Typography>
                        1101 Stocks found
                    </Typography>
                    <Typography>
                        21 Indicators
                    </Typography>
                </CardContent>
            </ButtonBase>
        </Card>
    );
}

