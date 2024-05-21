"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { _xY } from '@/app/lib/_hs';
import Link from 'next/link';

interface LoginProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    changePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const resp = await response.json();
                const { accessToken, refreshToken, ...userData } = resp;
                // Store access token in localStorage
                if (typeof window !== "undefined") {
                    localStorage.setItem("__xtkn", _xY(accessToken));
                    localStorage.setItem("__xAccess", _xY(refreshToken));
                    localStorage.setItem("__xererkd___", _xY(JSON.stringify(userData)));
                }

                // Route based on user role
                window.location.href = "/d"
                // router.push("/1");


            } else {
                const data = await response.json();
                /*    console.log("data, ",data);   */
                setLoading(false);
                setError(data.error || 'Failed to register');
            }
        } catch (error) {
            /*    console.error('Error registering user:', error);
               console.log("error", error);  */
            setLoading(false);
            setError('Failed to register');
        }
    };


    return (
        <>
            {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-5 space-y-3 bg-white rounded-lg shadow-md md:max-w-lg lg:max-w-lg">
                    <h1 className="text-2xl font-bold text-center md:text-3xl">Log In</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600 md:text-base">
                        Don&lquot;t have an account? <Link href="/signup" className="text-indigo-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div> */}
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 md:text-base">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600 md:text-base">
                        Don&lquot;t have an account? <Link href="/signup" className="text-indigo-500 hover:underline">Sign up</Link>
                    </p>
            </div>
            </div>
        </>
    );
};

export default LoginForm;
