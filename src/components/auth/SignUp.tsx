"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { _xY } from '@/app/lib/_hs';
import Link from 'next/link';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    terms: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

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
      const response = await fetch('/api/signup', {
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
        // router.push("/1");
        window.location.href = "/1"
      } else {
        const data = await response.json();
        setLoading(false);
        setError(data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setLoading(false);
      setError('Failed to register');
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center md:text-3xl">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 md:text-base">Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 md:text-base">
          Already have an account? <Link href="login" className="text-indigo-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
