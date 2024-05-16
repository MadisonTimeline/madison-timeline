"use client";
import React from 'react'
import BoardPage from '@/components/layout/BoardPage'
import { useParams } from 'next/navigation'
import Layout from '@/components/layout/NewLayout'


export default function ClientBoardPage() {
    const { name } = useParams();
    let boardName = (name as string);

    return (
        <Layout>
            <BoardPage name={boardName} />
        </Layout>
    )

}