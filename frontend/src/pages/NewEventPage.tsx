import { useState } from 'react'
import { Container, Button, Grid, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";

import { Link, useNavigate } from 'react-router-dom';

import { postNewPizzaEvent } from 'queries';
import { useMutation } from '@tanstack/react-query';

import CustomDatePicker from "components/CustomDatePicker";
import { INewPizzaEvent, CustomSnackbarProps } from 'types';

function NewEventPage() {

    const mutation = useMutation(postNewPizzaEvent)

    const [pizzaPlace, setPizzaPlace] = useState("");
    const [dateTime, setDateTime] = useState<Date | null>(new Date());
    const navigate = useNavigate();

    const handlePizzaPlaceChange = (e: any) => {
        setPizzaPlace(e.target.value);
    }

    const handleEventSubmit = (e: any) => {
        e.preventDefault();

        if (dateTime == null) {
            // TODO: Show error, since date cannot be null
            return;
        }

        const newEventData: INewPizzaEvent = {
            "event": {
                "time": dateTime.toString(),
                "place": pizzaPlace
            }
        }

        mutation.mutate(newEventData);
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

            <Typography variant="h3" component="h3">Add new event</Typography>
            <form>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField 
                        required
                        id="place"
                        label="Place"
                        value={pizzaPlace}
                        onChange={handlePizzaPlaceChange}
                        />
                </Grid>
                <Grid item>
                    <CustomDatePicker onValueChanged={setDateTime}/>
                </Grid>
                <Grid container item direction="row" spacing={3}>
                    <Grid item>
                        {
                            mutation.isLoading
                            ? <CircularProgress />
                            : <Button 
                                disabled={pizzaPlace === ''}
                                variant="contained"
                                onClick={handleEventSubmit}>
                                    Add
                                </Button>
                        }
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/" variant="text">Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
            </form>
        </Container>
    )
}

function CustomSnackbar({ alertType, alertMessage, duration } : CustomSnackbarProps ) {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>
    )
}

export default NewEventPage;
