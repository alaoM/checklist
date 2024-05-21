


'use client'

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { FaPaperPlane } from 'react-icons/fa';

type FormInputs = {
  title: string;
  checklist: string[];
};

const Dashboard: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormInputs>();
  const [isMoved, setIsMoved] = useState(false);
  const titleWatch = watch('title');
  const checklistWatch = watch('checklist');

  useEffect(() => {
    if (titleWatch || checklistWatch) {
      setIsMoved(true);
    }
  }, [titleWatch, checklistWatch]);

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-gray-900">
        <div className="w-70 m-4 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Work fast from anywhere</h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Stay up to date and move work forward with Flowbite on iOS &amp; Android. Download the app today.
          </p>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4" >
          <form className="max-w-sm mx-auto">
            <input type="text" placeholder='Title...' className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <input type="text" placeholder='Checklist...' className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </form>
        </div>
      </div>
      {/*  <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-t-lg shadow-md transition-all duration-500 ease-in-out">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
          <div className="w-70">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="w-70">
            <label htmlFor="checklist" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Checklist
            </label>
            <textarea
              id="checklist"
              {...register('checklist')}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-70 p-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPaperPlane /> Submit
          </button>
        </form>
      </div> */}

    </>
  );
};

export default Dashboard;
