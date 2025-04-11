import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools position='bottom-left' />
			<ReactQueryDevtools initialIsOpen={false} />
			{/* <QueryClientProvider queryClient={queryClient}></QueryClientProvider> */}
		</>
	);
}
