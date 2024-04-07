// Comment Object
import React, { useState, useEffect } from 'react';
import { Comment } from '@/types/Comment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfileAvatar from './ProfileAvatar';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';


export default function CommentObject({
    comment,
    numComments,
    setNumComments,
    editedFlag,
    setEditedFlag
}: {
    comment: Comment, 
    numComments: number, 
    setNumComments: (numComments: number) => void,
    editedFlag: number,
    setEditedFlag: (editedFlag: number) => void
}) {
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(comment.content);

    const user = useKindeBrowserClient().user;

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    async function handleEdit(e: React.FormEvent) {
        e.preventDefault();
        // In a real application, you'd also send this to your backend to store
        const editedComment: Comment = {
            ...comment,
            content: content,
            edited: true,
        };

        const response = await fetch("/api/editComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedComment),
        });

        if (response.ok) {
            setEditMode(false);
        } else {
            // Handle errors
            console.error("Error editing comment");
        }
        setEditedFlag(editedFlag + 1);
    }

    async function handleDelete() {
        const requestData = {
            post_id: comment.post_id,
            id: comment.id,
            author_id: comment.author_id,
        };
        await fetch("/api/deleteComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });
        setNumComments(numComments - 1);
    }

    return (
        <Card>
            <CardHeader>
                <ProfileAvatar author_id={comment.author_id} showUsername={true} />
                {comment.edited ? <CardDescription className='font-light text-xs'>{comment.date.toLocaleString()} {" edited"}</CardDescription> :
                    <CardDescription className='font-light text-xs'>{comment.date.toLocaleString()}</CardDescription>}
                
            </CardHeader>
            <CardContent>
                {editMode ? (
                    <form className='flex flex-row p-1' onSubmit={handleEdit}>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={comment.content}
                            required
                        />
                        <Button type='submit'>
                            Save
                        </Button>
                    </form>
                ) : (
                    <p>{comment.content}</p>
                )
                }


            </CardContent>
            {user && user.id === comment.author_id && (
                <CardFooter>
                    <Button className="flex items-center gap-2" onClick={toggleEditMode} >
                        <EditIcon />
                    </Button>

                    <Button className="flex items-center gap-2" onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                </CardFooter>
            )
            }
        </Card>
    );
}