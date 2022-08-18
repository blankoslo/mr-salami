import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { fetchAllRestaurants } from 'queries';

import CreatePizzaEventAccordion from "components/CreatePizzaEventAccordion";
import CreateMultiplePizzaEventsAccordion from 'components/CreateMultiplePizzaEventsAccordion';
import PizzaEventsTabs from 'components/PizzaEventsTabs';

function HomePage() {
  return (
    <Container>
        <Grid container spacing={6}>
            <Grid item xs={12} container spacing={3} alignItems="center">
                <Grid item>
                    <Typography variant="h5" sx={{ mb: 1 }}>It's pizza time</Typography>
                    <Typography variant="body1">Create pizza events and let pizzabot take care of everything else.</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} container direction="column" spacing={2}>
                <Grid item>
                    <CreatePizzaEventAccordion />
                </Grid>
                <Grid item>
                    <CreateMultiplePizzaEventsAccordion />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <PizzaEventsTabs />
            </Grid>
        </Grid>
    </Container>
  );
}

export default HomePage;
