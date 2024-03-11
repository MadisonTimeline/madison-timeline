'use client';
import React from 'react'
import { useParams } from 'next/navigation'
import EditPost from '@/components/EditPost'
// id should be the [id] from the url

export default function EditPostPage() {
    const {id}= useParams();
    let postid = (id as string);
    return (
        <EditPost postid={postid} />
    )
}
