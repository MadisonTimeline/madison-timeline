import React from 'react'
import Layout from './Layout'
import BoardView from '../BoardView'

export default async function BoardPage({ title }: { title: string }) {

    return (
        <Layout
            pageTitle={title}
        >
            <div className="min-h-screen flex flex-col">
                <div className='flex justify-center'>
                    <h1 className="text-4xl p-1 ">{title}</h1>
                </div>
                <div>
                    <BoardView boardname={title}/>
                </div>
            </div>
        </Layout>
    )
}