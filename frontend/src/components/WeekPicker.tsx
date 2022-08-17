import { Button, Container, Grid } from "@mui/material";
import { getWeek } from "date-fns";
import { useState } from "react";
import CustomDay from "./CustomPickersDay";

export interface IWeek{
    weeknumber: number
    days: Date[]
}

function WeekPicker(){
    const [week, setWeek] = useState<IWeek>({weeknumber:1, days: [new Date(Date.now())]})
    const [chosenWeeks, setChosenWeeks] = useState<IWeek[]>([])
    function handleAddNewWeek(){
        if(!chosenWeeks.some((chosenWeek)=> {
            return chosenWeek.weeknumber === week?.weeknumber
        })){
            setChosenWeeks(chosenWeeks.concat(week))
        }
        
    }
    return(
        <Container>
        <form>
            <Grid container direction="column" spacing={3}>
                <CustomDay weekdays={week} setWeekdays={setWeek}/>
            </Grid>
            <Button onClick={handleAddNewWeek}>Legg til</Button>
            {chosenWeeks.map((week)=>{
                const startOfInterval = `${week.days[0].getDate()}.${week.days[0].getMonth()}`
                const endOfInterval = `${week.days[week.days.length-1].getDate()}.${week.days[week.days.length-1].getMonth()}`
                return <span>
                    <p>{week.weeknumber}</p>
                    <p>{`${startOfInterval}-${endOfInterval}`}</p>
                </span>
            }
            )}
                
        </form>
        </Container>
    )
}
export default WeekPicker