import {Link} from '@gravity-ui/uikit';
import {Provider} from 'react-redux';
import {ErrorBoundary} from 'react-error-boundary';
import {useRouteError} from 'react-router-dom';
import {store} from '../store';
import {ThemeProvider} from '@/entities/theme';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const LIGHT = 'light';
const DEFAULT_THEME = LIGHT;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export interface ProvidersProps {
    children: React.ReactNode;
    queryClient: QueryClient;
}

export const Fallback = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div role="alert" className="fallback">
            <h1 className="fallback__img">Something went wrong</h1>
            <span className="fallback__describe">error</span>
            <Link href="/" className="fallback__link">
                Go to home page
            </Link>
        </div>
    );
};

export const Providers = ({children, queryClient}: ProvidersProps) => {
    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>{children}</ThemeProvider>
                </QueryClientProvider>
            </Provider>
        </ErrorBoundary>
    );
};

export default Providers;
