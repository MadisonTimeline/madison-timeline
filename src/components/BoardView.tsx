"use client"

import { useSession } from "next-auth/react"
import React, { useState } from 'react';
import CommentSection from './CommentSection';
import { Post } from '@/types/Post';
import CreatePost from './CreatePost';
import { Button } from './ui/button';

function BoardView({ show, boardname }) {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [createPostModal, setCreatePostModal] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // In a real application, you'd also send this to your backend to store
        const newPost: Post = {
            id: posts.length + 1,
            title: postTitle,
            date: new Date(),
            board: boardname,
            body: postBody,
            author: loggedIn ? 'Anon' : 'Anonymous',
            comments: [],
        };
        setPosts([...posts, newPost]);
        setPostTitle('');
        setPostBody('');
    };

    return (
        <div className=' flex flex-col justify-center align-center m-10'>
            <h1>{boardname}</h1>
            <div className='h-[40vh] overflow-auto'>

                {posts.map((post) => (
                    <div key={post.id} className=' bg-white border b-1 rounded p-1'>
                        <div className='flex flex-row justify-between'>
                            <div>{post.author}</div>
                            <h2 className='text-black font-bold'>{post.title}</h2>
                            <div className=' text-black'>{post.date.toDateString()}</div>
                        </div>
                        <p className=' text-black'>{post.body}</p>
                        <CommentSection postid={post.id} />
                    </div>
                ))}
            </div>

            <div className='absolute right-20 bottom-0'>
                {status === "loading" ? (
                    <Button>Loading...</Button>
                ) : (
                    !createPostModal ? (<Button onClick={() => setCreatePostModal(true)}>Create Post</Button>)
                        : (
                            <>
                                <Button onClick={() => setCreatePostModal(false)} className='absolute right-3 top-3'>X</Button>
                                <CreatePost />
                            </>
                        )
                )}

            </div>
        </div>
    );
};

export default BoardView;