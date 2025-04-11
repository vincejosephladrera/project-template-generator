import { createLazyFileRoute } from '@tanstack/react-router';
import img from '@/assets/bg.webp';

export const Route = createLazyFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<div className=' h-screen w-screen'>
			<img src={img} alt='bg image' className='h-full w-full object-cover' />
		</div>
	);
}
