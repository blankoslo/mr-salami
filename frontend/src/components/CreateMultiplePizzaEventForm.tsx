import { useState } from 'react'
import { Container, Button, Grid, TextField, CircularProgress, Select, MenuItem, Card, CardContent, Box, Typography } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select'
import { GroupOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { postNewPizzaEvent } from 'queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMediaQuery from '@mui/material/useMediaQuery';
import { INewPizzaEvent, IRestaurant } from 'types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CustomSnackbar from 'components/CustomSnackbar';
import { DesktopDatePicker, MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import { useTheme } from '@mui/material/styles';
import WeekPicker from './WeekPicker';

interface CreateMultiplePizzaEventProps {
    setAccordionStateCallback: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateMultiplePizzaEventForm(props : CreateMultiplePizzaEventProps ) {

    const { setAccordionStateCallback } = props;

    const queryClient = useQueryClient();

    const mutation = useMutation(postNewPizzaEvent, {
        onSuccess: () => {
            queryClient.invalidateQueries(['upcomingPizzaEvents']);
            queryClient.invalidateQueries(['allPizzaEvents']);
        }
    });

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [pizzaPlace, setPizzaPlace] = useState("");
    const [date, setDate] = useState(new Date());

    const handlePizzaPlaceChange = (e: any) => {
        setPizzaPlace(e.target.value);
    }

    const handleDateChange = (e: any) => {
        setDate(e.target.value);
    }

    const handleEventSubmit = (e: any) => {
        e.preventDefault();

        if (date == null) {
            // TODO: Show error, since date cannot be null
            return;
        }

        const newEventData: INewPizzaEvent = {
            "events": [{
                "time": date.toString(),
                "place": pizzaPlace
            }]
        }

        mutation.mutate(newEventData);
        setAccordionStateCallback(false);
    }

    return (
        <Container>
            { 
                mutation.isError ? (
                    <CustomSnackbar
                        alertType='error'
                        alertMessage='Could not add new pizza events.'
                        duration={6000}
                        />
                        ) : null
            }

            { 
                mutation.isSuccess ? (
                    <CustomSnackbar 
                        alertType='success'
                        alertMessage='Successfully added new pizza events!'
                        duration={6000}
                    />
                ) : null
            }
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="body1">1. Which weeks do you want pizza events?</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <WeekPicker setAccordionStateCallback={setAccordionStateCallback} />
                    </Grid>
                </Grid>
        </Container>
    )
}

export default CreateMultiplePizzaEventForm;
