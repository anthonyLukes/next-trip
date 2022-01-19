import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/header';
import NextTrip from './features/NextTrip';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0097d0',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/:route?/:direction?">
              <Header />
              <NextTrip />
            </Route>
          </Switch>
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
