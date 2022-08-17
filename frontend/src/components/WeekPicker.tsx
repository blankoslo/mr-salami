import { Button, Container, Grid, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWeek } from "date-fns";
import { nb } from "date-fns/locale";
import { weekdays } from "moment";
import { fetchAllRestaurants, postNewPizzaEvent } from "queries";
import { useState } from "react";
import { INewPizzaEvent, IRestaurant } from "types";
import CustomDay from "./CustomPickersDay";
import DayPicker from "./DayPicker";

export interface IWeek{
    weeknumber: number
    days: Date[]
}

function CreateRandomPizzaEvents(chosenWeeks: IWeek[], days: string[], time: Date, restaurants:IRestaurant[]): INewPizzaEvent{
    function dayToIndex(day: string){
        const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ];
        return days.indexOf(day)
    }
    let myevents = []
    for (const week of chosenWeeks){
        let date = week.days[dayToIndex(days[Math.floor(Math.random() * days.length)])]
        date.setHours(time.getHours())
        date.setMinutes(time.getMinutes())
        let restaurant = restaurants[Math.floor(Math.random()*restaurants.length)]
        myevents.push({
          time: date.toString(),
          place: restaurant.name
        })
    }
    return {events: myevents}
}

function WeekPicker(){
    const [week, setWeek] = useState<IWeek>({weeknumber:1, days: [new Date(Date.now())]})
    const [chosenWeeks, setChosenWeeks] = useState<IWeek[]>([])
    const [days, setDays] = useState<string[]>([])
    const [time, setTime] = useState<Date>(new Date(0, 0, 0, 18, 0))

    const queryClient = useQueryClient();

    const mutation = useMutation(postNewPizzaEvent, {
        onSuccess: () => {
        queryClient.invalidateQueries(["upcomingPizzaEvents"]);
        queryClient.invalidateQueries(["allPizzaEvents"]);
        },
  });
    function handleAddNewWeek(){
        if(!chosenWeeks.some((chosenWeek)=> {
            return chosenWeek.weeknumber === week?.weeknumber
        })){
            setChosenWeeks(chosenWeeks.concat(week))
        }
        
    }
    const {data} = useQuery(['restaurants'],fetchAllRestaurants)

    function handleSubmitEvents(){
        let events = CreateRandomPizzaEvents(chosenWeeks, days, time, data)
        mutation.mutate(events);

    }
    return(
        <Container>
        <form>
            <Grid container direction="column" spacing={3}>
                <CustomDay weekdays={week} setWeekdays={setWeek}/>
                <Button onClick={handleAddNewWeek}>Legg til</Button>
                <DayPicker days={days} setDays={setDays} />
                <LocalizationProvider  adapterLocale={nb} dateAdapter={AdapterDateFns}>
                    <TimePicker
                    label="Time"
                    value={time}
                    onChange={(newTime)=> {
                        if(newTime){
                            setTime(newTime)
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={handleSubmitEvents}>Lag events</Button>
            </Grid>

        </form>
        </Container>
    )
}
export default WeekPicker