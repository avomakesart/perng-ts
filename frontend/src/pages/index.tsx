import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { NavBar } from '../components/NavBar/NavBar';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';

function Home() {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='flex flex-col items-center justify-center flex-1 px-20 text-center'>
          <h1 className='text-6xl font-bold'>
            Welcome to{' '}
            <a className='text-blue-600' href='https://nextjs.org'>
              Next.js!
            </a>
          </h1>

          <p className='mt-3 text-2xl'>
            Get started by editing{' '}
            <code className='p-3 font-mono text-lg bg-gray-100 rounded-md'>
              pages/index.js
            </code>
          </p>

          <div className='flex flex-wrap items-center justify-around mt-6 sm:w-full'>
          <section className="text-gray-600 body-font">
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-wrap -m-4'>
                <div className='p-4 md:w-1/3'>
                  <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                    <img
                      className='lg:h-48 md:h-36 w-full object-cover object-center'
                      src='https://dummyimage.com/720x400'
                      alt='blog'
                    />
                    <div className='p-6'>
                      <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                        CATEGORY
                      </h2>
                      <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
                      {!data
              ? <div>Loading...</div>
              : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
                      </h1>
                      <p className='leading-relaxed mb-3'>
                        Photo booth fam kinfolk cold-pressed sriracha leggings
                        jianbing microdosing tousled waistcoat.
                      </p>
                      <div className='flex items-center flex-wrap '>
                        <a className='text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0'>
                          Learn More
                          <svg
                            className='w-4 h-4 ml-2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12h14'></path>
                            <path d='M12 5l7 7-7 7'></path>
                          </svg>
                        </a>
                        <span className='text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
                          <svg
                            className='w-4 h-4 mr-1'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            viewBox='0 0 24 24'
                          >
                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                            <circle cx='12' cy='12' r='3'></circle>
                          </svg>
                          1.2K
                        </span>
                        <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
                          <svg
                            className='w-4 h-4 mr-1'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            viewBox='0 0 24 24'
                          >
                            <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                          </svg>
                          6
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </div>
        </main>

        <footer className='flex items-center justify-center w-full h-24 border-t'>
          <a
            className='flex items-center justify-center'
            href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Powered by{' '}
            <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
          </a>
        </footer>
      </div>
    </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
