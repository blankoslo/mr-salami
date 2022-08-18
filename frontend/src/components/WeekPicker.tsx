import { Button, Box, Container, Divider, Grid, TextField, Typography } from "@mui/material";
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
import { Clear } from "@mui/icons-material";

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
    const [value, setValue] = useState<Date | null>(new Date());

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
            setValue(null);
        }
        
    }
    const {data} = useQuery(['restaurants'],fetchAllRestaurants)

    function handleSubmitEvents(){
        let events = CreateRandomPizzaEvents(chosenWeeks, days, time, data)
        mutation.mutate(events);
    }

    const handleDeleteChosenWeek = (index: number) => {
        const remainingWeeks = chosenWeeks.filter((data, idx) => idx !== index );
        setChosenWeeks(remainingWeeks);
    }

    return(
        <form>
            <Grid item xs={12} container direction="column" alignItems={"center"} spacing={2}>
                <Grid item xs={12}>
                    <CustomDay weekdays={week} setWeekdays={setWeek} value={value} setValue={setValue}/>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="outlined" onClick={handleAddNewWeek}>Legg til</Button>
                </Grid>

                <Grid item xs={12} container alignItems={"flex-start"}>
                    <Grid item>
                        <Typography sx={{ mb: 1 }} >Chosen weeks</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    {
                        chosenWeeks.map((week : IWeek, index: number) => {
                            const firstChosenDayString = `${week.days[0].getDate()}.${week.days[0].getMonth() + 1}`
                            const lastChosenDayString = `${week.days[week.days.length - 1].getDate()}.${week.days[week.days.length - 1].getMonth() + 1}`
                            const weekString = `${firstChosenDayString} - ${lastChosenDayString}`
                            return (
                                <Grid item xs={12} container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Box sx={{ py: 1}}>
                                            <Typography sx={{ my: 1 }} variant="subtitle2" component="span">{week.weeknumber}</Typography>
                                            <Box component="span" sx={{ mx: 1 }}/>
                                            <Typography sx={{ my: 1 }} color="primary.main" variant="body1" component="span">{weekString}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Clear onClick={() => handleDeleteChosenWeek(index)}/>
                                    </Grid>
                                    <Grid item>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            
                <Grid item xs={12}>
                    <DayPicker days={days} setDays={setDays} />
                </Grid>
                <Grid item xs={12}>
                <LocalizationProvider  adapterLocale={nb} dateAdapter={AdapterDateFns}>
                    <TimePicker
                    label="Time"
                    value={time}
                    onChange={(newTime)=> {
                        if(newTime){
                            setTime(newTime)
                        }
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                <Button onClick={handleSubmitEvents}>Lag events</Button>
                </Grid>
            </Grid>

        </form>
    )
}
export default WeekPicker