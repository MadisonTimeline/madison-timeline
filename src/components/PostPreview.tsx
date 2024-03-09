"use client";
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Post } from "@/types/Post"
import { User } from "@/types/User"
import Link from "next/link"

export default function PostPreview({ post, user }: { post: Post, user: any }) {
    const [liked, setLiked] = useState(user.liked_posts.includes(post.id));
    const [disliked, setDisliked] = useState(user.disliked_posts.includes(post.id));

    function handleLike(updateLike: boolean) {
        let likeChange: integer = 0;
        let dislikeChange: integer = 0;
        if (updateLike) {
            if (liked) {
                setLiked(false);
                likeChange = -1;
                user.liked_posts = user.liked_posts.filter((postId) => postId !== post.id);

            } else {
                setLiked(true);
                likeChange = 1;
                if (!user.liked_posts.includes(post.id)) {
                    user.liked_posts.push(post.id);
                }
                if (disliked) {
                    setDisliked(false);
                    dislikeChange = -1;
                    user.disliked_posts = user.disliked_posts.filter((postId) => postId !== post.id);
                }
            }
        } else {
            if (disliked) {
                setDisliked(false);
                dislikeChange = -1;
                user.disliked_posts = user.disliked_posts.filter((postId) => postId !== post.id);
            } else {
                setDisliked(true);
                dislikeChange = 1;
                if (!user.disliked_posts.includes(post.id)) {
                    user.disliked_posts.push(post.id);
                }
                if (liked) {
                    setLiked(false);
                    likeChange = -1;
                    user.liked_posts = user.liked_posts.filter((postId) => postId !== post.id);
                }
            }
        }

        const userLikeTuple = {
            userId: user.id,
            postId: post.id,
            likeChange: likeChange,
            dislikeChange: dislikeChange,
            liked_posts: user.liked_posts,
            disliked_posts: user.disliked_posts
        }
        fetch("/api/updateLike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLikeTuple),
        });
        setLiked(!liked);
    }

    return (
        <Card>
            <CardHeader>
                <Link href={`/post/${post.id}`}>
                    <CardTitle>{post.title}</CardTitle>
                </Link>
                <CardDescription>{post.date.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="truncate"> {post.body}</p>
            </CardContent>
            <CardFooter className='flex items-center gap-2'>

                <Button className="flex items-center gap-2" onClick={handleLike(true)}>
                    {
                        liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />
                    }
                    Like
                </Button>
                <Button className="flex items-center gap-2" onClick={handleLike(false)}>
                    {
                        disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />
                    }
                    Dislike
                </Button>
            </CardFooter>
        </Card>
    )
}