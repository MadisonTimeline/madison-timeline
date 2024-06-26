"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post } from "@/types/Post";
import Link from "next/link";
import ProfileAvatar from "@/components/ProfileAvatar";

export default function PostPreview({
    post,
    user,
    needRefresh,
    setNeedRefresh,

}: {
    post: Post;
    user: any;
    needRefresh: boolean;
    setNeedRefresh: Function;
}) {
    const [liked, setLiked] = useState(post.liked_users && post.liked_users.includes(user.id));
    const [disliked, setDisliked] = useState(post.disliked_users && post.disliked_users.includes(user.id));
    const [liked_users, setLikedUsers] = useState(post.liked_users ? post.liked_users : []);
    const [disliked_users, setDislikedUsers] = useState(post.disliked_users ? post.disliked_users : []);
    const [views, setViews] = useState(post.views);

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

    function handleLike() {
        if (liked) {
            setLikedUsers(liked_users.filter((id) => id !== user.id));
        } else {
            if (disliked) {
                setDislikedUsers(disliked_users.filter((id) => id !== user.id));
            }
            setLikedUsers([...liked_users, user.id]);
        }
    }

    function handleDislike() {
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
        if (!needRefresh) {
            setNeedRefresh(true);
        }
    }

    return (
        <Card>
            <CardHeader>
                <ProfileAvatar author_id={post.author_id} showUsername={true} />
                <Link href={`/post/${post.id}`}>
                    <CardTitle>{post.title}</CardTitle>
                </Link>
                <CardDescription>{post.date.toLocaleString()}</CardDescription>
                <div className="flex gap-2">
                    {
                        post.board_names.map((board_name) => (
                            <Badge key={board_name} variant="outline">{board_name}</Badge>
                        ))
                    }
                </div>
            </CardHeader>
            <CardContent>
                <p className="truncate max-w-[90%]"> {post.body}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Label> {views} VIEWS</Label>
                <Button className="flex items-center gap-2" onClick={handleLike}>
                    {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    {liked_users.length}
                </Button>

                <Button className="flex items-center gap-2" onClick={handleDislike}>
                    {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                    {disliked_users.length}
                </Button>

                {user && post.author_id === user.id && (
                    <>
                        <Link href={`/post/edit/${post.id}`} >
                            <Button className="flex items-center gap-2" >
                                <EditIcon />
                            </Button>
                        </Link>

                        <Button className="flex items-center gap-2" onClick={handleDelete}>
                            <DeleteIcon />
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
