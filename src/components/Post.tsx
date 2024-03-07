// This is a component that will display a single post

import React from 'react'
import { Post } from '@/types/Post'
import { useEffect, useState } from 'react'

export default function Post({ postid }: { postid: string }) {
    // fetch the post from the server
    const [post, setPost] = useState<Post>({
        id: "",
        title: "",
        date: new Date(),
        board_name: "",
        body: "",
        likes: 0,
        dislikes: 0,
        views: 0,
        authorId: "",
    });



    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/getPost/${postid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                } else {
                    console.error("Error fetching Post:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching Post:", error);
            }
        }
    
        fetchPost();
    }, [postid]);


    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}