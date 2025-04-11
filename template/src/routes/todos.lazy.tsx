import { createLazyFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/getTodos';

export const Route = createLazyFileRoute('/todos')({
	component: RouteComponent,
});

function RouteComponent() {
	const { isLoading, data } = useQuery({
		queryKey: ['todos', 'all'],
		queryFn: getTodos,
		staleTime: 30000,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(data);

	return (
		<div>
			{data.map(({ id, title }: { id: number; title: string }) => (
				<div key={id}>
					<p>Post {title}</p>
				</div>
			))}
		</div>
	);
}
