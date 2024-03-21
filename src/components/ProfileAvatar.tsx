import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Post } from '@/types/Post'


export default function ProfileAvatar({ post }: { post: Post }) {

    const [picture, setPicture] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfilePicture() {
            const res = await fetch(`/api/getProfile/${post.authorId}`);
            const data = await res.json();
            setPicture(data.picture);
            console.log(data.picture);
            setUsername(data.username);
            setLoading(false);
        }
        getProfilePicture();
    }, [post.authorId]);

    if (loading) {
        return (
            <Image 
                src="/avatars/default-avatar.png" 
                alt="Avatar Placeholder" 
                width={40} 
                height={40} 
                className="rounded-full"
            />
        )
    }
    return (
        <Avatar>
            <AvatarImage src={picture} />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
    )
}