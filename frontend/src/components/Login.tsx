import { useState } from 'react'
import { Container, Button, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
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

    const handleEventSubmit = (e: any) => {
        e.preventDefault();
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        navigate("/")
    }

    return (
        <Container>
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
                        <Button component={Link} to="/" variant="text" onClick={handleEventSubmit}>Log In</Button>
                    </Grid>
            </Grid>
        </form>
        </Container>
    )
}