import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AppTestProvider({ children, url }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={url}>
        <Switch>
          <Route path="/:route?/:direction?">{children}</Route>
        </Switch>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

export default AppTestProvider;
