// This is a component that will display a single post

import React from 'react'
import { Post } from '@/types/Post'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Button } from './ui/button'


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
        liked_users: [],
        disliked_users: [],
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
        <Card>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <p> {post.body}</p>
            </CardContent>
            <CardFooter className='flex items-center gap-2'>
                <Label> {post.likes} likes</Label>
                <Label> {post.dislikes} dislikes</Label>
                <Label> {post.views} views</Label>
            </CardFooter>
        </Card>
        
    )
}