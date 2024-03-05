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
import Link from "next/link"



export default function PostPreview({ post }: { post: Post }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    function handleLike() {
        setLiked(!liked);
    }
    function handleDislike() {
        setDisliked(!disliked);
    }

    return (
        <Card>
            <CardHeader>
                <Link href={`/post/${post.id}`}>
                    <CardTitle>{post.title}</CardTitle>
                </Link>
                <CardDescription>{post.author}</CardDescription>
                <CardDescription>{post.date.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <p> {post.body}</p>
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