"use client";
import React from 'react'
import Layout from '@/components/layout/NewLayout'
import BoardPage from '@/components/layout/BoardPage'

export default function BoardMainPage() {
    return (
        <Layout>
            <BoardPage name="Main" />
        </Layout>
    )
}