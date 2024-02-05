import React from 'react'
import Layout from './Layout'
import BoardView from '../BoardView'

export default function BoardPage({ title }) {
    return (
        <Layout
            pageTitle={title}
        >
            <div className="min-h-screen flex flex-col">
                <div>
                    <h1 className="text-4xl">{title}</h1>
                </div>
                <div>
                    <BoardView />
                </div>
            </div>
        </Layout>
    )
}