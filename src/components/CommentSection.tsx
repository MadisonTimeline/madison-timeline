import React, { useState, useEffect } from 'react';
import { Comment } from '@/types/Comment';
import { v4 as uuidv4 } from "uuid";
import CommentObject from './CommentObject';
import CreateComment from './CreateComment';

function CommentSection({ post_id, showComments }: { post_id: string, showComments: boolean }) {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [numComments, setNumComments] = useState(0);
    const [editedFlag, setEditedFlag] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`/api/getComments/${post_id}`);
            if (response.ok) {
                const data = await response.json();
                // set type of the comments to Comment type
                const receivedComments = data as Comment[];
                // set date to Date type
                receivedComments.forEach((comment) => {
                    comment.date = new Date(comment.date);
                });
                setComments(receivedComments);
            } 
        };

        if (showComments) {
            fetchComments();
            setNumComments(comments.length);
        }
    }, [post_id, showComments, numComments, editedFlag, comments.length]);

    

    return (
        <div className=' flex flex-col justify-center align-center'>

            {
                showComments && comments.length !== 0 &&
                <hr className='border border-border mt-1 mb-1' />

            }
            {showComments && comments.map((comment) => (
                <div key={comment.id} className='h-auto overflow-auto text-sm p-1'>
                    <CommentObject comment={comment} numComments={numComments} setNumComments={setNumComments} editedFlag={editedFlag} setEditedFlag={setEditedFlag}/>
                </div>
            ))}
            {showComments &&
                <CreateComment comments={comments} setComments={setComments} post_id={post_id} />
            }
        </div>

    );
};

export default CommentSection;