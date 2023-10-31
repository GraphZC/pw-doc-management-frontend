'use client'

import Spinner from "@/components/Spinner";
import { errorAlert } from "@/lib/sweetAlert";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSending) return;
        setIsSending(true);

        setPassword('');
        signIn('credentials', {
            username,
            password,
            redirect: false,
        }).then((res) => {
            if (res?.ok === true) {
                router.replace('/dashboard');
            } else {
                errorAlert({
                    title: 'Login failed',
                    text: 'Invalid username or password',
                });
            }
            setIsSending(false);
        }).catch((err) => {
            errorAlert({
                title: 'Login failed',
                text: 'Server error please try again later',
            });
            setIsSending(false);
        });
        
    }

    return (
        <div className='bg-blue-400 w-screen h-screen'>
            <div className="flex justify-center h-screen">
                <div className="bg-white px-10 py-8 rounded-lg shadow-lg w-4/12 my-auto">
                    <h1 className="mb-2 text-2xl font-bold text-center">Login</h1>
                    <form 
                        onSubmit={(e) => handleLogin(e)}
                    >
                        <div className="mb-2">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text" 
                                name="username" 
                                id="username" 
                                className="block w-full rounded-lg py-2 border-gray-300" 
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="block w-full rounded-lg py-2 border-gray-300" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-5">
                            <button 
                                className={ `${isSending ? 'bg-gray-600' : 'bg-gray-900'} text-white px-4 py-2 rounded-lg w-full flex justify-center` }
                                disabled={isSending}
                            >
                                { isSending && (<Spinner color="white"/>) }
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}