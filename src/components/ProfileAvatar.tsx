import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { useState, useEffect } from 'react'
import { Post } from '@/types/Post'


export default function ProfileAvatar({ author_id, showUsername }: { author_id: string, showUsername: boolean }) {

    const [picture, setPicture] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfilePicture() {
            const res = await fetch(`/api/getProfile/${author_id}`);
            const data = await res.json();
            setPicture(data.picture);
            setUsername(data.username);
            setLoading(false);
        }
        getProfilePicture();
    }, [author_id]);

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