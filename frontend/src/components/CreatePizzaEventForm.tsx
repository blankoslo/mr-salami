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

interface CreatePizzaEventProps {
    restaurants: IRestaurant[],
    setAccordionStateCallback: React.Dispatch<React.SetStateAction<boolean>>
}

function CreatePizzaEventForm(props : CreatePizzaEventProps ) {

    const { restaurants, setAccordionStateCallback } = props;

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
    const [date, setDate] = useState<Date | null>(new Date());

    const handlePizzaPlaceChange = (e: any) => {
        setPizzaPlace(e.target.value);
    }

    const handleDateChange = (newValue: Date | null) => {
        setDate(newValue);
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
                        alertMessage='Could not add new pizza event.'
                        duration={6000}
                        />
                        ) : null
            }

            { 
                mutation.isSuccess ? (
                    <CustomSnackbar 
                        alertType='success'
                        alertMessage='Successfully added new pizza event!'
                        duration={6000}
                    />
                ) : null
            }
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {
                                isDesktop ?
                                (
                                    <DesktopDatePicker
                                        disablePast
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                )
                                :
                                (
                                    <MobileDatePicker
                                        disablePast
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                )
                            }

                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Time"
                                ampm={false}
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={pizzaPlace}
                            onChange={handlePizzaPlaceChange}
                            select // tell TextField to render select
                            label="Restaurant"
                            fullWidth
                        >
                            {
                                restaurants ?
                                restaurants.map((restaurant: IRestaurant) => {
                                    return <MenuItem key={restaurant.id} value={restaurant.name}>{restaurant.name}</MenuItem>
                                })
                                : <MenuItem>Could not get restaurants</MenuItem>
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Card variant="outlined" sx={{backgroundColor: "primary.light"}}>
                            <CardContent>
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                    <GroupOutlined sx={{ mr: 1 }}/>
                                    <Typography variant="body2" color="primary" fontWeight="bold">
                                        5 guests
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1">
                                    Pizzabot chooses who to invite so you don't have to.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid container item direction="row" spacing={3}>
                        <Grid item xs={7}>
                            {
                                mutation.isLoading
                                ? <CircularProgress />
                                : <Button 
                                    fullWidth
                                    disabled={pizzaPlace === ''}
                                    variant="contained"
                                    onClick={handleEventSubmit}>
                                        Save
                                    </Button>
                            }
                        </Grid>
                        <Grid item xs={5}>
                            <Button onClick={() => setAccordionStateCallback(false)} fullWidth variant="text">Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Container>
    )
}

export default CreatePizzaEventForm;
