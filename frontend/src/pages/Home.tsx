import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link,useNavigate } from 'react-router-dom';

import PizzaEvents from 'components/PizzaEvents';
import { fetchAllPizzaEvents, fetchUpcomingPizzaEvents } from 'queries';

function HomePage() {

  const navigate = useNavigate()

  const handleLogOut = (e: any) =>{
    e.preventDefault();
    localStorage.clear()
    navigate("/login")
    
  }
  return (
    <Container>
        <Grid container spacing={6}>
            <Grid item container spacing={3} alignItems="center">
                <Grid item xs={4}>
                    <Typography variant="h3" component="h3">Pizza Events</Typography>
                </Grid>
                <Grid item xs={8} container spacing={3}>
                    <Grid item>
                        <Button component={Link} to='/new-event' variant="contained" >Add upcoming event</Button>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to='/restaurants' variant="outlined" >Restaurants</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleLogOut}> Log out</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h6">Upcoming</Typography>
                    <PizzaEvents queryKey={['upcomingPizzaEvents']} query={fetchUpcomingPizzaEvents}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h6">Old</Typography>
                    <PizzaEvents queryKey={['allPizzaEvents']} query={fetchAllPizzaEvents}/>
                </Grid>
            </Grid>
        </Grid>
    </Container>
  );
}

export default HomePage;
