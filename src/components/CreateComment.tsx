import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '@/types/Comment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


export default function CreateComment({
    comments,
    setComments,
    post_id
}: {
    comments: Comment[],
    setComments: (comments: Comment[]) => void,
    post_id: string
}) {
    const [content, setContent] = useState('');
    const user = useKindeBrowserClient().user;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(!user) {
            alert("You must be logged in to comment");
            return;
        }
        // In a real application, you'd also send this to your backend to store
        const newComment: Comment = {
            id: uuidv4(),
            post_id: post_id,
            date: new Date(),
            content: content,
            author_id: user.id,
            edited: false,
        };

        const response = await fetch("/api/createComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        });

        if (response.ok) {
            setComments([...comments, newComment]);
            setContent('');

        } else {
            // Handle errors
            console.error("Error creating comment");
        }
    };

    return (
        <form className='flex flex-row p-1' onSubmit={handleSubmit}>
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a Comment"
                required
            />
            <Button type='submit' className='' >Post</Button>
        </form>
    )
}