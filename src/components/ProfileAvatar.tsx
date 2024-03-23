import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Post } from '@/types/Post'


export default function ProfileAvatar({ post, showUsername }: { post: Post, showUsername: boolean }) {

    const [picture, setPicture] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfilePicture() {
            const res = await fetch(`/api/getProfile/${post.author_id}`);
            const data = await res.json();
            setPicture(data.picture);
            console.log(data.picture);
            setUsername(data.username);
            setLoading(false);
        }
        getProfilePicture();
    }, [post.author_id]);

    return (
        <div className='flex flex-row align-center'>
            <Avatar className='w-7 h-7'>
                <AvatarImage src={picture} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            {showUsername && <span className="text-md p-1">{username}</span>}
        </div>

    )
}