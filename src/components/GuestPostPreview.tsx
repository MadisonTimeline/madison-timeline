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
import { Badge } from "@/components/ui/badge"

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Post } from "@/types/Post"
import Link from "next/link"



export default function GuestPostPreview({ post }: { post: Post }) {
    const [liked_users, setLikedUsers] = useState(post.liked_users ? post.liked_users : []);
    const [disliked_users, setDislikedUsers] = useState(post.disliked_users ? post.disliked_users : []);

    function handleLike() {
        // alert the user if they are not logged in

        alert("You must be logged in to like a post");
        return;

    }

    function handleDislike() {
        // alert the user if they are not logged in

        alert("You must be logged in to dislike a post");
        return;

    }

    return (
        <Card>
            <CardHeader>
                <Link href={`/post/${post.id}`}>
                    <CardTitle>{post.title}</CardTitle>
                </Link>
                <CardDescription>{post.date.toLocaleString()}</CardDescription>
                <div className="flex gap-2">
                    <Badge variant="outline">{post.board_name}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="truncate"> {post.body}</p>
            </CardContent>
            <CardFooter className='flex items-center gap-2'>

                <Button className="flex items-center gap-2" onClick={handleLike}>
                    <ThumbUpOffAltIcon />

                    Like
                </Button>
                <Label> {liked_users.length} LIKES</Label>
                <Button className="flex items-center gap-2" onClick={handleDislike}>
                    <ThumbDownOffAltIcon />

                    Dislike
                </Button>
                <Label> {disliked_users.length} DISLIKES</Label>
            </CardFooter>
        </Card>
    )
}