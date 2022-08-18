import { useState, KeyboardEvent, MouseEvent } from "react";
import { Container, AppBar, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Grid, Typography, Divider } from "@mui/material"
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from "react-router-dom";

function Navbar() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const toggleDrawer = (open: boolean) =>
        (event: KeyboardEvent | MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as KeyboardEvent).key === 'Tab' ||
            (event as KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    }

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            {/* <Container> */}
            {
                isDesktop ? 
                
                (
                    <Grid container alignItems="center" justifyContent="flex-start">
                        <Grid item>
                            <IconButton size="large" color="primary" onClick={toggleDrawer(true)}>
                                <Menu color="secondary" fontSize="large" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>Pizza</Typography>
                        </Grid>
                    </Grid>
                )

                :

                (
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Pizza</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={toggleDrawer(true)}>
                                <Menu color="secondary" fontSize="large"/>
                            </IconButton>
                        </Grid>
                    </Grid>

                )
            }
            {/* </Container> */}
            <NavbarDrawer anchor={isDesktop ? "left" : "right"} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
        </AppBar>
    )
}

interface NavbarDrawerProps {
    anchor: "left" | "right",
    drawerOpen: boolean,
    toggleDrawer(open: boolean): (event: KeyboardEvent | MouseEvent) => void
}

function NavbarDrawer(props: NavbarDrawerProps) {

    const { anchor, drawerOpen, toggleDrawer } = props;

    const navigate = useNavigate();

    const handleLogOut = (e: any) =>{
        e.preventDefault();
        console.log("clicked logout");
        localStorage.clear();
        toggleDrawer(false);
        navigate("/login");
    }

    return (
        <Drawer
            variant="temporary"
            anchor={anchor}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <ListItemButton component={Link} to='/' onClick={toggleDrawer(false)}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton component={Link} to='/restaurants' onClick={toggleDrawer(false)}>
                        <ListItemText primary="Restaurants" />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemButton onClick={handleLogOut}>
                        <ListItemText primary="Log out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Navbar;