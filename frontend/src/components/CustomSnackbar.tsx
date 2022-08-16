import { useState } from "react";
import { CustomSnackbarProps } from "types";
import { Alert, Snackbar } from "@mui/material";


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

export default CustomSnackbar;