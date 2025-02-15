import { useState } from 'react'
import { Container, Button, Grid, TextField, CircularProgress, Snackbar, Alert, Typography } from "@mui/material";

import { Link } from 'react-router-dom';

import { fetchAllRestaurants, postNewRestaurant } from 'queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INewRestaurant, CustomSnackbarProps } from 'types';
import Restaurants from 'components/Restaurants';

function RestaurantsPage() {

    const queryClient = useQueryClient();

    const mutation = useMutation(postNewRestaurant, {
        onSuccess: () => {
            queryClient.invalidateQueries(['restaurants']);
        }
    });

    const [pizzaPlace, setPizzaPlace] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePizzaPlaceChange = (e: any) => {
        setPizzaPlace(e.target.value);
    }

    const handleAddressChange = (e: any) => {
        setAddress(e.target.value);
    }

    const handlePhoneNumberChange = (e: any) => {
        setPhoneNumber(e.target.value);
    }

    const handleRestaurantSubmit = (e: any) => {
        // e.preventDefault();

        const newRestaurantData: INewRestaurant = {
            restaurant: {
                name: pizzaPlace,
                address: address,
                phone_number: phoneNumber,
            }
        }

        mutation.mutate(newRestaurantData);
    }

    return (
        <Container>
            { 
                mutation.isError ? (
                    <CustomSnackbar
                        alertType='error'
                        alertMessage='Could not add new restaurant.'
                        duration={6000}
                        />
                        ) : null
            }

            { 
                mutation.isSuccess ? (
                    <CustomSnackbar 
                        alertType='success'
                        alertMessage='Successfully added new restaurant!'
                        duration={6000}
                    />
                ) : null
            }

            <Grid container spacing={6}>

                <Grid item>
                    <Typography variant="h3" component="h3">Restaurants</Typography>
                </Grid>

                <Grid item container spacing={3}>

                    <Grid item container xs={6} direction="column" spacing={3}>
                        <Grid item>
                            <Typography variant="h6" component="h6">Add new restaurant</Typography>
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="place"
                                label="Name"
                                value={pizzaPlace}
                                onChange={handlePizzaPlaceChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="address"
                                label="Address"
                                value={address}
                                onChange={handleAddressChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="phoneNumber"
                                label="Phone number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                />
                        </Grid>
                        <Grid container item direction="row" spacing={3}>
                            <Grid item>
                                {
                                    mutation.isLoading
                                    ? <CircularProgress />
                                    : <Button 
                                        disabled={pizzaPlace === ''}
                                        variant="contained"
                                        onClick={handleRestaurantSubmit}>
                                            Add
                                        </Button>
                                }
                            </Grid>
                            <Grid item>
                                <Button component={Link} to="/" variant="text">Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Restaurants queryKey={["restaurants"]} query={fetchAllRestaurants} />
                    </Grid>
                </Grid>
            </Grid>
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

export default RestaurantsPage;
