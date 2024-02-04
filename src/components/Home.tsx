'use client';
import React, { useEffect } from 'react';
import { useSession, signOut, signIn } from 'next-auth/react';

export function HomeComponent(): React.JSX.Element {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            signIn();
        }
    }, [session, status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <></>; // or render a loading indicator
    }

    return (
        <>
            <p>Welcome {session?.user?.name}. Signed In As</p>
            <p>{session?.user?.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    );
}
