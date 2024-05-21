'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { _xY } from '@/app/lib/_hs';
import Link from 'next/link';
import { showErrorToast, showSuccessToast } from '../Notifications';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showSuccessToast('Registration successfull...')
        const resp = await response.json();
        const { accessToken, refreshToken, ...userData } = resp;

        if (typeof window !== 'undefined') {
          localStorage.setItem('__xtkn', _xY(accessToken));
          localStorage.setItem('__xAccess', _xY(refreshToken));
          localStorage.setItem('__xererkd___', _xY(JSON.stringify(userData)));
        }

        window.location.href = '/1';
      } else {
        const data = await response.json();
        showErrorToast(data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      showErrorToast('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center md:text-3xl">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 md:text-base">Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
            />
            {errors.fullName && <p className="text-smtext-red-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 md:text-base">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 md:text-base">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character',
                },
              })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:py-3"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
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
