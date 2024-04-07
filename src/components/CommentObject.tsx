// Comment Object
import React from 'react';
import { Comment } from '@/types/Comment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import ProfileAvatar from './ProfileAvatar';

export default function CommentObject({ comment }: { comment: Comment }) {
    return (
        <Card>
            <CardHeader>
                <ProfileAvatar author_id={comment.author_id} showUsername={true}/>
                <Label className='font-light text-xs'>{comment.date.toLocaleString()}</Label>
            </CardHeader>
            <CardContent>
                <p >{comment.content}</p>
            </CardContent>
        </Card>
    );
}