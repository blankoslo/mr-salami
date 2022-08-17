import { useState } from "react";
import { Container, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "queries";
import CustomSnackbar from "components/CustomSnackbar";
import DayPicker from "./DayPicker";

import CustomDay from './CustomPickersDay';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSucessLogin = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    navigate("/");
  };

  const handleEventSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };
  const mutation = useMutation(login, {
    onSuccess: handleSucessLogin,
    onError: () => setPassword(""),
  });

  return (
    <Container>
      <Grid container alignItems="center" direction="column" spacing={3}>
        <Grid item xs={12} alignItems="center">
          <Typography align="center" variant="h3">
            Log in
          </Typography>
          <form onSubmit={handleEventSubmit}>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                <TextField
                  required
                  id="username"
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  error={mutation.isError}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={mutation.isError}
                  helperText={mutation.isError && "Invalid credentials"}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Forgot password or want access? Contact your local pizzabot
                  administrator
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
