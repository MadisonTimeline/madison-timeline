"use client";
import React, { useState, useEffect } from 'react';
import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';
import PostPreview from '../PostPreview';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function MyCommentsList() {
    const [comments, setComments] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [needReload, setNeedReload] = useState(false);

    const { user } = useKindeBrowserClient();

    function handleClickGoToPost(postId) {
        window.location.href = `/post/${postId}`;
    }

    // get user's comments
    useEffect(() => {
        // fetch comments
        async function fetchAllUserComments() {
            if (!user) {
                return;
            }
            const response = await fetch(`/api/comments/get/author_id/${user.id}`);
            const data = await response.json();


            const fetchedComments = data.map((comment: any) => {
                comment.date = new Date(comment.date);
                return comment;
            });

            if (response.ok) {
                setComments(fetchedComments);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.log("Error fetching posts");
            }
        }
        fetchAllUserComments();
    }, [user]);

    useEffect(() => {
        if (needReload) {
            setNeedReload(false);
        }
    }, [needReload]);



    if (!user) {
        return (
            <div className='flex flex-row justify-center align-center'>
                <p className='text-xl'>You must be logged in to view your comments.</p>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className='flex flex-row justify-center align-center'>
                <p className='text-xl'>Loading...</p>
            </div>
        )
    }
    return (
        <div className='flex flex-row justify-center align-center'>
            {
                comments.length === 0 && (
                    <p className='text-xl'>You have not created any comments yet.</p>
                )

            }
            <div className='flex flex-col justify-center align-center'>
            {
                comments.map((comment: Comment) => {
                    return (
                        <Card key={comment.id}>
                            <CardHeader>
                                <CardTitle>{comment.date.toLocaleString()}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{comment.content}</p>

                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleClickGoToPost(comment.post_id)}>Go to post</Button>
                            </CardFooter>
                        </Card>
                    )
                })
            }
            </div>


        </div>
    )


}