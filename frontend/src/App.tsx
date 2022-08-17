import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Login from 'components/Login';
import Navbar from 'components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import theme from 'theme';

import HomePage from 'pages/Home';
import RestaurantsPage from 'pages/RestaurantsPage';
import WeekPicker from 'components/WeekPicker';

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }:any) => {
  if (!localStorage.hasOwnProperty("username") || !localStorage.hasOwnProperty("password")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>

        <Router>
            <Routes>
              <Route 
                path="/login" 
                element={
                  <Login />
                } 
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/restaurants"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <RestaurantsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/weekpicker" element={<WeekPicker/>}/>
            </Routes>
        </Router>

      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
