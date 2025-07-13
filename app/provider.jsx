"use client"
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react';
import React, { Suspense, useEffect } from 'react'
import { api } from '@/convex/_generated/api';

function Provider({ children }) {
    const user = useUser();
    const createNewUserMutation = useMutation(api.users.CreateNewUser);

    useEffect(() => {
        user && CreateUser();
    }, [user])

    const CreateUser = async () => {
        const data = {
            name: user?.displayName,
            email: user?.primaryEmail,
            picture: user?.profileImageUrl
        }

        const result = await createNewUserMutation({
            ...data
        })
        console.log(result);
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    )
}

export default Provider