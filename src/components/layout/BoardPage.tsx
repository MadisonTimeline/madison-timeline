import React from 'react'
import Layout from './Layout'
import BoardView from '../BoardView'

export default function BoardPage({ title, description }: { title: string, description: string }) {

    return (
        <Layout
            pageTitle={title}
        >
            <div className="min-h-screen flex flex-col">
                <div className='flex flex-col p-5 bg-accent h-[100px]'>
                    <h1 className="text-4xl ">{title} Board</h1>
                    <p>{description}</p>
                </div>
                <div>
                    <BoardView boardname={title}/>
                </div>
            </div>
        </Layout>
    )
}