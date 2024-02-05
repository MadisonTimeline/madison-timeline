
import React, { useState } from 'react';
import { Comment } from '@/types/Comment';
import { randomInt } from 'crypto';

function CommentSection({ postid }) {
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
            author: 'Anon',

        };
        setComments([...comments, newComment]);
        setContent('');

    };

    return (
        <div className=' flex flex-col justify-center align-center'>

            {
                showComments ?
                    <button onClick={() => setShowComments(false)}>Hide Comments</button>
                    :
                    <button onClick={() => setShowComments(true)}>Show Comments</button>
            }
            {showComments && comments.map((comment) => (
                <div className='h-auto overflow-auto'>
                    <div key={comment.id} className=' bg-white border b-1 rounded p-1'>
                        <div className='flex flex-row justify-between'>
                            <div>{comment.author}</div>
                            <div className=' text-black'>{comment.date.toDateString()}</div>
                        </div>
                        <p className=' text-black'>{comment.content}</p>
                    </div>
                </div>
            ))}

            <form onSubmit={handleSubmit} className=' flex flex-col w-auto left-3 right-3'>
                <div className='flex flex-row'>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='w-full border b-1 p-1'
                        placeholder="Comment"
                        required
                    />
                    <button type="submit" className='bg-white border b-1'>Submit</button>
                </div>

            </form>
        </div>

    );
};

export default CommentSection;