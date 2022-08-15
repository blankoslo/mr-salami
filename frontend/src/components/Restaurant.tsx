import { IRestaurant } from 'types';
import { Grid, Box, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postNewRestaurant } from 'queries';
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
                phoneNumber: phoneNumber,
            }
        }

        mutation.mutate(newRestaurantData);
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
                            value={data.name}
                            onChange={handlePizzaPlaceChange}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="address"
                            label="Address"
                            fullWidth
                            value={data.address}
                            onChange={handleAddressChange}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="phone"
                            label="Phone number"
                            fullWidth
                            value={data.phone_number}
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