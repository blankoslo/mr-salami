import { useQuery} from '@tanstack/react-query'
import { IPizzaEvent, PizzaEventProps } from 'types';
import { Box, Grid, Card, Typography, CardContent } from '@mui/material';
import { GroupOutlined, Place, AccessTime } from '@mui/icons-material';

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function convertToDateObject(timestring: string) {
    // Input: Wed, 19 Oct 2016 18:00:00 GMT
    const strings = timestring.split(' ').slice(1, 5);
    const clockstrings = strings[3].split(":");
    return new Date(
        parseInt(strings[2]),
        month.indexOf(strings[1]),
        parseInt(strings[0]),
        parseInt(clockstrings[0]),
        parseInt(clockstrings[1]),
        parseInt(clockstrings[2])
    );
}

function PizzaEvents({ queryKey, query } : PizzaEventProps) {
  const { isLoading, error, data } = useQuery(
      queryKey,
      query
  )

  if (isLoading) return (
      <Typography variant="subtitle1">Loading...</Typography>
  )
      
  if (error) return (
    <Typography variant="subtitle1">Could not fetch pizza events</Typography>
    )

  if (data === undefined || data.length == 0) {
      return (
          <Card variant="outlined" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ my: 5 }} >No upcoming events</Typography>
          </Card>
      )
  }

  return (
    <Grid container spacing={3}>
        {
            data.map((pizzaEvent : IPizzaEvent, index: number) => {
                return (
                    <Grid item xs={12} key={index}>
                        <PizzaEventCard 
                            key={index}
                            time={pizzaEvent.time} 
                            place={pizzaEvent.place} 
                            attendees={pizzaEvent.attendees} 
                        />
                    </Grid>
                )
            })
        }
    </Grid>
  )
}

function PizzaEventCard({time, place, attendees }: IPizzaEvent) {

    const date = convertToDateObject(time)
    const dayOfTheWeek = date.toLocaleDateString('en-US', {weekday: 'long'})
    let datestring =  date.toLocaleDateString('no-NO')
    let [day, month, year] = datestring.split(".")  
    let minutes = date.getMinutes().toString()
    minutes = minutes.length == 1 ? "0" + minutes : minutes
    day = day.length == 1 ? "0" + day : day
    month = month.length == 1 ? "0" + month : month

    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {dayOfTheWeek} {day}.{month}.{year}
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            <Place sx={{ mr: 1 }} />
                            <Typography>
                                {place}
                            </Typography>
                            <Box sx={{ mx: 1}} component="span" />
                            <AccessTime sx={{ mr: 1 }} />
                            <Typography>
                                {date.getHours()}:{minutes}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            <GroupOutlined sx={{ mr: 1 }}/>
                            <Typography variant="body2" color="primary">
                                3/5 har takket ja
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PizzaEvents;