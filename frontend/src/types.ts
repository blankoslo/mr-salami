import { AlertColor } from "@mui/material";

export interface IPizzaEvent {
  time: string;
  place: string;
  attendees: string[];
  eventType?: "upcoming" | "previous"
}

export interface INewRestaurant {
  restaurant: {
    name: string;
    address: string;
    phone_number: string;
  };
}

export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  phone_number: string;
}

export interface EditRestaurantProps {
  id: string;
  data: INewRestaurant;
}

export interface PizzaEventProps {
  queryKey: string[];
  query: () => Promise<any>;
}

export interface CustomDatePickerProps {
  onValueChanged: React.Dispatch<React.SetStateAction<Date | null>>;
}

export interface INewPizzaEvent {
  events: 
    {
      time: string;
      place: string;
    }[]
  ;
}

export interface CustomSnackbarProps {
  alertType: AlertColor | undefined;
  alertMessage: string;
  duration: number;
}
