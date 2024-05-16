'use client';
import React from 'react'
import { useParams } from 'next/navigation'
import Layout from '@/components/layout/NewLayout'
import Post from '@/components/Post'
// id should be the [id] from the url

export default function PostPage() {
    const { id } = useParams();
    let post_id = (id as string);
    return (
        <Layout>
            <Post post_id={post_id} />
        </Layout>
    )
}
