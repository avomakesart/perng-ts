import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/InputField/InputField';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useState } from 'react';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  console.log(tokenError);

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <Formik
        initialValues={{
          newPassword: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);

            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }

            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push('/');
          }
        }}
      >
        {({ values, handleChange }) => (
          <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
            <div className='flex flex-col overflow-y-auto md:flex-row'>
              <div className='h-32 md:h-auto md:w-1/2'>
                <img
                  aria-hidden='true'
                  className='object-cover w-full h-full dark:hidden'
                  src='https://windmill-dashboard.vercel.app/assets/img/forgot-password-office.jpeg'
                  alt='Office'
                />
                <img
                  aria-hidden='true'
                  className='hidden object-cover w-full h-full dark:block'
                  src='https://windmill-dashboard.vercel.app/assets/img/forgot-password-office.jpeg'
                  alt='Office'
                />
              </div>
              <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
                <div className='w-full'>
                  <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                    Forgot password
                  </h1>

                  <Form>
                    <InputField
                      value={values.newPassword}
                      label='New Password'
                      placeholder='new password'
                      type='password'
                      onChange={handleChange}
                      htmlFor='password'
                      name='password'
                    />

                    {tokenError ? (
                      <div className='px-4 py-2 text-left'>
                        <span className='font-semibold text-white'>Error</span>
                        <p className='mb-1 text-sm leading-none text-white'>
                          {tokenError}
                        </p>
                        <NextLink href='/forgot-password'>
                          Click here to get a new one
                        </NextLink>
                      </div>
                    ) : null}

                    <button
                      className='block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'
                      type='submit'
                    >
                      Change Password
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
