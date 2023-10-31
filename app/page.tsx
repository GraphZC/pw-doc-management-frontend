'use client';
import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		return (
			// Full screen spinner
			<div className="flex justify-center h-screen bg-gray-100">
				<div className="my-auto">
					<Spinner color='black'/>
				</div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		router.replace('/login');
		return null;
	} else if (status === 'authenticated') {
		router.replace('/dashboard');
		return null;
	}
}