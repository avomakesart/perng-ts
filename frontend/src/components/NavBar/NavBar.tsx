import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  if (fetching) {
  } else if (!data.me) {
    body = (
      <>
        <button className='text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900'>
          <NextLink href='/login'>Sign in</NextLink>
        </button>

        <span className='inline-flex rounded-md shadow-sm'>
          <button className='inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'>
            <NextLink href='/register'>Sign up</NextLink>
          </button>
        </span>
      </>
    );
  } else {
    body = (
      <>
        <button
          type='button'
          className='flex items-center focus:outline-none'
          aria-label='toggle profile dropdown'
        >
          <div className='w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full'>
            <img
              src='https://lh3.googleusercontent.com/a-/AOh14Gi0DgItGDTATTFV6lPiVrqtja6RZ_qrY91zg42o-g'
              className='object-cover w-full h-full'
              alt='avatar'
            />
          </div>

          <h3 className='mx-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
            {data.me.username}
          </h3>
        </button>

        <button
          onClick={() => {
            logout()
          }}
          className='text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900'
        >
          {logoutFetching ? 'Signed out...' : 'logout'}
        </button>
      </>
    );
  }

  return (
    <header className='w-full px-8 text-gray-700 bg-white'>
      <div className='container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl'>
        <div className='relative flex flex-col md:flex-row'>
          <a
            href='#_'
            className='flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0'
          >
            <span className='mx-auto text-xl font-black leading-none text-gray-900 select-none'>
              tails<span className='text-indigo-600'>.</span>
            </span>
          </a>
          <nav className='flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200'>
            <a
              href='#_'
              className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
            >
              Home
            </a>
            <a
              href='#_'
              className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
            >
              Features
            </a>
            <a
              href='#_'
              className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
            >
              Pricing
            </a>
            <a
              href='#_'
              className='mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900'
            >
              Blog
            </a>
          </nav>
        </div>

        <div className='inline-flex items-center ml-5 space-x-6 lg:justify-end'>
          {body}
        </div>
      </div>
    </header>
  );
};
