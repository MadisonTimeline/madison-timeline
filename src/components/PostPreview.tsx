"use client";
import React from "react"
import { useState, useEffect } from "react"
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

export default function PostPreview({ post, user }: { post: Post; user: any; }) {

    const [likedPosts, setLikedPosts] = useState<string[]>([]);
    const [dislikedPosts, setDislikedPosts] = useState<string[]>([]);
    const [liked, setLiked] = useState(likedPosts.includes(post.id));
    const [disliked, setDisliked] = useState(dislikedPosts.includes(post.id));

    useEffect(() => {
        async function fetchLikedAndDisLikedPosts() {
            try {
                const response = await fetch(`/api/getUserLikedAndDislikedPosts/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLikedPosts(data.liked_posts);
                    setDislikedPosts(data.disliked_posts);
                } else {
                    console.error("Error fetching username:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        }
        fetchLikedAndDisLikedPosts();
    }, [user.id]);



    function handleLike() {
        let likeChange = 0;
        let dislikeChange = 0;

        if (liked) {
            setLiked(false);
            likeChange = -1;
            setLikedPosts(likedPosts.filter((postId) => postId !== post.id));

        } else {
            setLiked(true);
            likeChange = 1;
            if (!likedPosts.includes(post.id)) {
                setLikedPosts([...likedPosts, post.id]);
            }
            if (disliked) {
                setDisliked(false);
                dislikeChange = -1;
                setDislikedPosts(dislikedPosts.filter((postId) => postId !== post.id));
            }
        }

        const userLikeTuple = {
            userId: user.id,
            postId: post.id,
            likeChange: likeChange,
            dislikeChange: dislikeChange,
            liked_posts: likedPosts,
            disliked_posts: dislikedPosts
        }
        fetch("/api/updateLike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLikeTuple),
        });
    }


    function handleDislike() {
        let likeChange = 0;
        let dislikeChange = 0;

        if (disliked) {
            setDisliked(false);
            dislikeChange = -1;
            setDislikedPosts(dislikedPosts.filter((postId) => postId !== post.id));
        } else {
            setDisliked(true);
            dislikeChange = 1;
            if (!dislikedPosts.includes(post.id)) {
                setDislikedPosts([...dislikedPosts, post.id]);
            }
            if (liked) {
                setLiked(false);
                likeChange = -1;
                setLikedPosts(likedPosts.filter((postId) => postId !== post.id));
            }
        }


        const userLikeTuple = {
            userId: user.id,
            postId: post.id,
            likeChange: likeChange,
            dislikeChange: dislikeChange,
            liked_posts: likedPosts,
            disliked_posts: dislikedPosts
        }
        fetch("/api/updateLike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLikeTuple),
        });
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

                <Button className="flex items-center gap-2" onClick={handleLike}>
                    {
                        liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />
                    }
                    Like
                </Button>
                <Button className="flex items-center gap-2" onClick={handleDislike}>
                    {
                        disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />
                    }
                    Dislike
                </Button>
            </CardFooter>
        </Card>
    )
}