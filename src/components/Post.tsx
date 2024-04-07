// This is a component that will display a single post

import React from 'react'
import { Post } from '@/types/Post'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Button } from './ui/button'
import CommentSection from './CommentSection'
import Profile from './Profile'
import ProfileAvatar from './ProfileAvatar'


export default function Post({ post_id }: { post_id: string }) {
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(true);

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
        author_id: "",
        liked_users: [],
        disliked_users: [],
    });
    const [dateString, setDateString] = useState("");


    useEffect(() => {
        async function updateViews() {
            const requestData = {
                post_id: post.id,
            };
            await fetch("/api/viewPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
        }
        if (post.id !== "") {
            updateViews();
        }
    }, [post]);


    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/getPost/${post_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Convert date strings to JavaScript Date objects
                    setDateString(new Date(data.date).toLocaleString());
                    setPost(data);
                    setLoading(false);
                } else {
                    console.error("Error fetching Post:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching Post:", error);
            }
        }

        fetchPost();
    }, [post_id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <ProfileAvatar author_id={post.author_id} showUsername={true} />
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{dateString}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{post.body}</p>
                </CardContent>
                <CardFooter className='flex items-center gap-2'>
                    <Label>{post.likes} likes</Label>
                    <Label>{post.dislikes} dislikes</Label>
                    <Label>{post.views} views</Label>
                    {
                        showComments ?
                            <Label onClick={() => setShowComments(false)}>Hide Comments</Label>
                            :
                            <Label onClick={() => setShowComments(true)}>Show Comments</Label>
                    }
                </CardFooter>
            </Card>
            <CommentSection post_id={post.id} showComments={showComments} />
        </>
    );
}