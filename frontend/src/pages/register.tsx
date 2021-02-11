import React from 'react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { InputField } from '../components/InputField/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

 
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({options: values });
        console.log(response.error?.message);

        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          // worked
          router.push('/');
        }
      }}
    >
      {({ values, handleChange }) => (
        <div className='container w-screen h-screen mx-auto overflow-hidden bg-gray-100 shadow-lg md:flex md:h-full'>
          <div className='grid w-full grid-cols-3'>
            <div
              className='h-full col-span-1 p-6 bg-bottom bg-cover rounded-none sm:h-full sm:rounded sm:w-auto'
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)`,
              }}
            >
              <div className='pt-2 font-serif text-5xl font-bold text-left text-black my-18'>
                Music
              </div>
              <div className='text-left text-white-600'>
                Let the Power of Beats flow in you
              </div>
              <div className='inline-block px-4 py-2 mt-5 text-center text-white bg-blue-600 rounded hover:bg-blue-500'>
                Learn More
              </div>
            </div>
            <div className='flex items-center justify-center w-full col-span-2'>
              <Form className='max-w-xl p-4 mx-auto mt-4'>
                <div className='mb-8 font-serif text-5xl font-bold text-center text-black'>
                  Register
                </div>
                <div className='flex flex-wrap mb-6 -mx-3'>
                  <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                    <InputField
                      value={values.firstName}
                      onChange={handleChange}
                      label='First Name'
                      type='text'
                      placeholder='First Name'
                      htmlFor='firstname'
                      name='firstName'
                    />
                  </div>
                  <div className='w-full px-3 md:w-1/2'>
                    <InputField
                      value={values.lastName}
                      onChange={handleChange}
                      label='Last Name'
                      type='text'
                      placeholder='Last Name'
                      htmlFor='lastname'
                      name='lastName'
                    />
                  </div>
                </div>
                <div className='flex flex-wrap mb-6 -mx-3'>
                  <div className='w-full px-3'>
                    <InputField
                      value={values.username}
                      onChange={handleChange}
                      label='Username'
                      type='text'
                      placeholder='Username'
                      htmlFor='username'
                      name='username'
                    />
                  </div>
                </div>
                <div className='flex flex-wrap mb-6 -mx-3'>
                  <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                    <InputField
                      value={values.email}
                      onChange={handleChange}
                      label='Email'
                      type='text'
                      placeholder='Email'
                      htmlFor='email'
                      name='email'
                    />
                  </div>
                </div>
                <div className='flex flex-wrap mb-6 -mx-3'>
                  <div className='w-full px-3 mb-6 md:w-1/2 md:mb-0'>
                    <InputField
                      value={values.password}
                      onChange={handleChange}
                      label='Password'
                      type='password'
                      placeholder='Password'
                      htmlFor='password'
                      name='password'
                    />
                  </div>
                  <div className='w-full px-3 md:w-1/2'>
                    <label
                      className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase'
                      htmlFor='grid-last-name'
                    >
                      Confirm Password
                    </label>
                    <input
                      className='block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border-b-2 border-gray-500 rounded appearance-none hover:border-blue-500 hover:shadow-xl focus:outline-none focus:bg-white focus:border-gray-500'
                      type='password'
                      placeholder='Confirm Password'
                    />
                  </div>
                </div>

                <div className='flex justify-center mt-6'>
                  <button
                    type='submit'
                    className='px-8 py-2 font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-orange-500 hover:from-teal-400 hover:to-blue-500'
                  >
                    Register
                  </button>
                </div>

                <div className='flex justify-center mt-1'>
                  <h6 className='text-xs font-bold tracking-wide text-gray-700 '>
                    or register with
                  </h6>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
