import { ButtonBase, Card, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function Discover() {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Card>
                        <ButtonBase component='a' href='stock'>
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
                </Grid>
            </Grid>
        </Container>
    );
}