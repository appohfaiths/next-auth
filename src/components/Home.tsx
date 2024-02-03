'use client';
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import { LoginForm } from '.';

export function HomeComponent() {
    const { data: session } = useSession();

          if(session){
            return (
                <>
                    <p>Welcome {session.user?.name}. Signed In As</p>
                    <p>{session.user?.email}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
                )
          }
    return (
        <LoginForm />
    )
}
