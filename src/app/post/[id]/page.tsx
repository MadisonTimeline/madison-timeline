'use client';
import React from 'react'
import { useParams } from 'next/navigation'
// id should be the [id] from the url

export default function PostPage() {
    const { id } = useParams();

    return (
        <>
            <div>
                PostPage
            </div>
            <div>
                {id}
            </div>

        </>
    )
}
