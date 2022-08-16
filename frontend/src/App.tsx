import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Login from 'components/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import theme from 'theme';

import HomePage from 'pages/Home';
import NewEventPage from 'pages/NewEventPage';
import { Fragment } from 'react';
import RestaurantsPage from 'pages/RestaurantsPage';

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
              path="/new-event"
              element={
              <ProtectedRoute>
                <NewEventPage />
              </ProtectedRoute>
              } />
              <Route 
              path="/"
              element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
              } />
              <Route 
              path="/login" 
              element={
                <Login />
              } />
              <Route 
              path="/restaurants"
              element={
                <ProtectedRoute>
                  <RestaurantsPage />
                </ProtectedRoute>
              } />
            </Routes>
        </Router>

      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
