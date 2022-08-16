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
        <h1>Pizza Events</h1>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" component="h6">Upcoming</Typography>
                <Button variant="contained" onClick={handleLogOut}> Log out</Button>
                <Button component={Link} to='/new-event' variant="contained" >Add upcoming event</Button>
                <PizzaEvents queryKey={['upcomingPizzaEvents']} query={fetchUpcomingPizzaEvents}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" component="h6">Old</Typography>
                <PizzaEvents queryKey={['allPizzaEvents']} query={fetchAllPizzaEvents}/>
            </Grid>
        </Grid>
    </Container>
  );
}

export default HomePage;
