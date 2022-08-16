import { IRestaurant } from 'types';
import { Grid, Box, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CustomSnackbar from 'components/CustomSnackbar';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editRestaurant } from 'queries';
import { INewRestaurant } from 'types';

function Restaurant({ id, name, phone_number, address } : IRestaurant) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="span">{name}</Typography>
            <IconButton color="primary" onClick={handleOpen}><Edit/></IconButton>
            <Typography variant="body2" component="p">{address}</Typography>
            <Typography variant="body2" component="p">{phone_number}</Typography>
            <EditDialog open={open} handleClose={handleClose} data={{ id, name, address, phone_number }} />
        </Box>
    )
}

interface EditDialogProps {
    data: IRestaurant,
    open: boolean,
    handleClose: () => void,
}

function EditDialog({ open, handleClose, data } : EditDialogProps ) {

    const queryClient = useQueryClient();

    const mutation = useMutation(editRestaurant, {
        onSuccess: () => {
            queryClient.invalidateQueries(['restaurants']);
        }
    });

    const [pizzaPlace, setPizzaPlace] = useState(data.name);
    const [address, setAddress] = useState(data.address);
    const [phoneNumber, setPhoneNumber] = useState(data.phone_number);

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

        const updatedRestaurantData: INewRestaurant = {
            restaurant: {
                name: pizzaPlace,
                address: address,
                phone_number: phoneNumber,
            }
        }

        mutation.mutate({ id: data.id, data: updatedRestaurantData });
        handleClose();
    }

    if (mutation.isError) {
        return (
            <CustomSnackbar
                alertType='error'
                alertMessage='Could not edit restaurant.'
                duration={6000}
            />
        )
    }
    
    if (mutation.isSuccess) {
        return (
            <CustomSnackbar 
                alertType='success'
                alertMessage='Successfully updated the restaurant!'
                duration={6000}
            />
        )
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit restaurant</DialogTitle>
            <DialogContent>
                <Grid container direction="column" spacing={3} sx={{ my: 1 }}>
                    <Grid item>
                        <TextField
                            autoFocus
                            id="name"
                            label="Name"
                            fullWidth
                            value={pizzaPlace}
                            onChange={handlePizzaPlaceChange}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="address"
                            label="Address"
                            fullWidth
                            value={address}
                            onChange={handleAddressChange}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="phone"
                            label="Phone number"
                            fullWidth
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" onClick={handleRestaurantSubmit}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Restaurant;