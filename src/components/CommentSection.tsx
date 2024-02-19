import React, { useState } from 'react';
import { Comment } from '@/types/Comment';
import { randomInt } from 'crypto';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

function CommentSection({ postid, user }: { postid: string, user: any }) {
    const [content, setContent] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you'd also send this to your backend to store
        const newComment: Comment = {
            id: postid + "c" + comments.length + 1,
            postid: postid,
            date: new Date(),
            content: content,
            author: user.given_name,
            authorId: user.id,

        };
        setComments([...comments, newComment]);
        setContent('');

    };

    return (
        <div className=' flex flex-col justify-center align-center'>
            <div className='text-xs flex flex-row justify-end'>
                {
                    showComments ?
                        <button onClick={() => setShowComments(false)}>Hide Comments</button>
                        :
                        <button onClick={() => setShowComments(true)}>Show Comments</button>
                }
            </div>
            {
                showComments && comments.length !== 0 && 
                <hr className='border border-border mt-1 mb-1' />
            }
            {showComments && comments.map((comment) => (
                <div key={comment.id} className='h-auto overflow-auto text-sm'>
                    <div key={comment.id} className=' bg-white p-1'>
                        <div className='flex flex-row justify-between'>
                            <div>{comment.author}</div>
                            <div className='text-black'>{comment.date.toLocaleDateString() + " " + comment.date.toLocaleTimeString()}</div>
                        </div>
                        <p className=' text-black'>{comment.content}</p>
                    </div>
                </div>
            ))}

            <form onSubmit={handleSubmit} className=' flex flex-col w-auto h-auto left-3 right-3'>
                <div className='flex flex-row h-auto'>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='w-full text-sm bg-input border border-border focus:outline-none ring-none'
                        placeholder="Add a Comment"
                        required
                    />
                    <button type="submit" className='bg-input'><SendRoundedIcon /></button>
                </div>

            </form>
        </div>

    );
};

export default CommentSection;