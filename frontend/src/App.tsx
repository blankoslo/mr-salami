import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import theme from 'theme';

import HomePage from 'pages/Home';
import NewEventPage from 'pages/NewEventPage';
import { Fragment } from 'react';

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>

        <Router>
            <Routes>
              <Route path="/new-event" element={<NewEventPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>

      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
