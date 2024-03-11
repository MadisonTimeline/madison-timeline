"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "@/types/Post";
import Link from "next/link";

export default function PostPreview({ post, user, setter }: { post: Post; user: any; setter: any }) {
    const [liked, setLiked] = useState(post.liked_users && post.liked_users.includes(user.id));
    const [disliked, setDisliked] = useState(post.disliked_users && post.disliked_users.includes(user.id));
    const [liked_users, setLikedUsers] = useState(post.liked_users ? post.liked_users : []);
    const [disliked_users, setDislikedUsers] = useState(post.disliked_users ? post.disliked_users : []);

    useEffect(() => {
        setLiked(liked_users && liked_users.includes(user.id));
        setDisliked(disliked_users && disliked_users.includes(user.id));
    }, [liked_users, disliked_users, user.id]);

    useEffect(() => {
        async function updateLikes() {
            const requestData = {
                post_id: post.id,
                liked_users: liked_users,
                disliked_users: disliked_users,
                likes: liked_users.length,
                dislikes: disliked_users.length,
            };
            await fetch("/api/likePost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
        }
        updateLikes();
    }, [liked_users, disliked_users, post.id]);

    async function handleLike() {
        if (liked) {
            setLikedUsers(liked_users.filter((id) => id !== user.id));
        } else {
            if (disliked) {
                setDislikedUsers(disliked_users.filter((id) => id !== user.id));
            }
            setLikedUsers([...liked_users, user.id]);
        }
    }

    async function handleDislike() {
        if (disliked) {
            setDislikedUsers(disliked_users.filter((id) => id !== user.id));
        } else {
            if (liked) {
                setLikedUsers(liked_users.filter((id) => id !== user.id));
            }
            setDislikedUsers([...disliked_users, user.id]);
        }
    }

    async function handleDelete() {
        console.log("Complete implementation: Delete post");
        const requestData = {
            post_id: post.id,
            user_id: user.id,
        };
        await fetch("/api/deletePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
        setter((prev: number) => prev - 1);
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
            <CardFooter className="flex items-center gap-2">
                <Button className="flex items-center gap-2" onClick={handleLike}>
                    {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    Like
                </Button>
                <Label> {liked_users.length} LIKES</Label>

                <Button className="flex items-center gap-2" onClick={handleDislike}>
                    {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                    Dislike
                </Button>
                <Label> {disliked_users.length} DISLIKES</Label>

                {post.author_id === user.id && (
                    <>
                        <Link href={`/post/edit/${post.id}`} >
                            <Button className="flex items-center gap-2" >
                                <EditIcon />
                                Edit Post
                            </Button>
                        </Link>

                        <Button className="flex items-center gap-2" onClick={handleDelete}>
                            <DeleteIcon />
                            Delete Post
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
