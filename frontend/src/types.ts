import { AlertColor } from "@mui/material";

export interface IPizzaEvent {
    time: string,
    place: string,
    attendees: string[],
}

export interface PizzaEventProps {
    queryKey: string[],
    query: () => Promise<any>,
}

export interface CustomDatePickerProps {
    onValueChanged: React.Dispatch<React.SetStateAction<Date | null>>,
}

export interface INewPizzaEvent {
    event: {
        time: string,
        place: string,
    }
}

export interface CustomSnackbarProps {
    alertType: AlertColor | undefined,
    alertMessage: string,
    duration: number,
}