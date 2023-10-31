import NextAuthProvider from '@/provider/NextAuthProvider'
import QueryClientProvider from '@/provider/QueryClientProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import ToastContainer from '@/provider/ToastContainer'
import 'react-toastify/dist/ReactToastify.css';

const prompt = Prompt({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
    style: "normal",
    subsets: ["latin-ext", "thai"],
}); 

export const metadata: Metadata = {
	title: 'Document Management - Poolworld',
	description: 'A document management system for Poolworld',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="th">
			<body className={ `${prompt.className} font-light` }>
				<NextAuthProvider>
					<QueryClientProvider>
						<ToastContainer />
						{children}
					</QueryClientProvider>
				</NextAuthProvider>
			</body>
		</html>
	)
}
