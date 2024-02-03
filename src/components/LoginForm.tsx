import React from 'react'
import { signIn } from 'next-auth/react';
import google from '../../public/icons/google.svg'
import Image from 'next/image';

export function LoginForm() {
  return (
    <div className='flex flex-col gap-5'>
          <p className='m-2'>Login to your account to continue</p>
      <button onClick={() => signIn('google')} className='text-white rounded-2xl bg-blue-500 px-2 py-4 flex gap-2 justify-evenly uppercase'>
        <Image src={google} alt='google logo' width={20} height={20} />
        <p>Sign in with google</p>
      </button>
          <button onClick={() => signIn('microsoft')}>Sign in with microsoft</button>
    </div>
  )
}
