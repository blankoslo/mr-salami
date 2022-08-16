import { useState } from 'react'
import { Container, Button, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from 'queries';
import { CustomSnackbar } from 'pages/NewEventPage';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSucessLogin = () => {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        navigate("/")
    }

    const handleEventSubmit = (e: any) => {
        e.preventDefault();
        mutation.mutate({username,password})
    }
    const mutation = useMutation(login, {
        onSuccess: handleSucessLogin,
    })

  // Submit using enter button
  // Simplest way i found but i feel like this should be default?
  const handleKeypress = (e:any) => {
          if (e.keyCode === 13) {
                  handleEventSubmit(e);
            } 
        };


    return (
        <Container>
            { 
                mutation.isError ? (
                    <CustomSnackbar
                        alertType='error'
                        alertMessage='Invalid credentials'
                        duration={6000}
                        />
                        ) : null
            }
        <h1>Log in</h1>
        <form>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField 
                        required
                        id="username"
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
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
                        />
                </Grid>
                    <Grid item>
                        <Button 
                        type="submit" 
                        variant="text"
                        onClick={handleEventSubmit}
                        onKeyPress={handleKeypress}>
                            Log In
                        </Button>
                    </Grid>
            </Grid>
        </form>
        </Container>
    )
}