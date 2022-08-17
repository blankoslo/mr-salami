import { useState } from "react";
import {
  Container,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { Link } from "react-router-dom";

import { fetchUpcomingPizzaEvents, postNewPizzaEvent } from "queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CustomDatePicker from "components/CustomDatePicker";
import { INewPizzaEvent } from "types";
import PizzaEvents from "components/PizzaEvents";
import CustomSnackbar from "components/CustomSnackbar";

function NewEventPage() {
  const queryClient = useQueryClient();

  const mutation = useMutation(postNewPizzaEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingPizzaEvents"]);
      queryClient.invalidateQueries(["allPizzaEvents"]);
    },
  });

  const [pizzaPlace, setPizzaPlace] = useState("");
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  const handlePizzaPlaceChange = (e: any) => {
    setPizzaPlace(e.target.value);
  };

  const handleEventSubmit = (e: any) => {
    e.preventDefault();

    if (dateTime == null) {
      // TODO: Show error, since date cannot be null
      return;
    }

    const newEventData: INewPizzaEvent = {
      events: [
        {
          time: dateTime.toString(),
          place: pizzaPlace,
        },
      ],
    };

    mutation.mutate(newEventData);
  };

  return (
    <Container>
      {mutation.isError ? (
        <CustomSnackbar
          alertType="error"
          alertMessage="Could not add new pizza event."
          duration={6000}
        />
      ) : null}

      {mutation.isSuccess ? (
        <CustomSnackbar
          alertType="success"
          alertMessage="Successfully added new pizza event!"
          duration={6000}
        />
      ) : null}

      <h1>Add new event</h1>
      <Grid container spacing={3}>
        <Grid item xs={6} container direction="column" spacing={3}>
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
            <CustomDatePicker onValueChanged={setDateTime} />
          </Grid>
          <Grid container item direction="row" spacing={3}>
            <Grid item>
              {mutation.isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  disabled={pizzaPlace === ""}
                  variant="contained"
                  onClick={handleEventSubmit}
                >
                  Add
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button component={Link} to="/" variant="text">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <h2>Upcoming events</h2>
          <PizzaEvents
            queryKey={["upcomingPizzaEvents"]}
            query={fetchUpcomingPizzaEvents}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewEventPage;
