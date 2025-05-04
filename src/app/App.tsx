import {QueryClient} from '@tanstack/react-query';
import {Providers} from './providers/providers';
import {AppRouter} from './routes/appRouter';

const queryClient = new QueryClient();

const App = () => {
    return (
        <Providers queryClient={queryClient}>
            <AppRouter />
        </Providers>
    );
};

export default App;
