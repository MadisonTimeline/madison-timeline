"use client";
import React from 'react'
import BoardPage from '@/components/layout/BoardPage'
import { useParams } from 'next/navigation'


export default function ClientBoardPage() {
    const { name } = useParams();
    let boardName = (name as string);

    return <BoardPage name={boardName} />
}