import React from 'react'
import Layout from './Layout'
import BoardView from '../BoardView'
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react";

export default async function BoardPage({ title }) {
    const session = useSession()
    if (session?.user) {
        session.user = {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        }
    }

    return (
        <Layout
            pageTitle={title}
        >
            <div className="min-h-screen flex flex-col">
                <div className='flex justify-center'>
                    <h1 className="text-4xl p-1 ">{title}</h1>
                </div>
                <div>
                    <SessionProvider session={session}>
                        <BoardView />
                    </SessionProvider>
                </div>
            </div>
        </Layout>
    )
}