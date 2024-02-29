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


export default function PostPreview() {
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
                <CardTitle>Title</CardTitle>
                <CardDescription>UserName</CardDescription>
            </CardHeader>
            <CardContent>
                <p> Post Body Preview</p>
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