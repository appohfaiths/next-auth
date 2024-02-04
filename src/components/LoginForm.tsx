import React from 'react'
import { signIn } from 'next-auth/react';
import google from '../../public/icons/google_logo.svg'
import microsoft from '../../public/icons/microsoft_logo.svg'
import Image from 'next/image';

export function LoginForm(): React.JSX.Element {
  return (
    <div className='flex flex-col gap-5 border-4 border-yellow-300 rounded-xl p-4 w-80'>
      <p className='m-2'>Login to your account to continue</p>
      <button onClick={() => signIn('google')} className='text-white rounded-2xl bg-blue-500 px-2 py-4 flex gap-2 justify-evenly uppercase'>
        <Image className='bg-white p-0.5 rounded-lg' src={google} alt='google logo' width={25} height={25} />
        <p>Sign in with google</p>
      </button>
      <button onClick={() => signIn('azure-ad', { callbackUrl: '/' })} className='text-white rounded-2xl bg-neutral-900 px-2 py-4 flex gap-2 justify-evenly uppercase'>
        <Image className='bg-white p-0.5' src={microsoft} alt='microsoft logo' width={25} height={25} />
        <p>Sign in with microsoft</p>
      </button>
    </div>
  )
}
