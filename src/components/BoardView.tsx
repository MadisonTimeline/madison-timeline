"use client"
import React, { useState } from 'react';
import CommentSection from './CommentSection';
import { Post } from '@/types/Post';
import CreatePost from './CreatePost';
import { Button } from './ui/button';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function BoardView({ boardname }: { boardname: string }) {
    const [posts, setPosts] = useState<Post[]>([]);

    const [createPostModal, setCreatePostModal] = useState(false);
    const { isLoading, user } = useKindeBrowserClient();



    if (isLoading) return <div>Loading...</div>;

    return (
        <div className=' flex flex-col justify-center align-center m-10'>
            <div className='h-[40vh] overflow-auto'>

                {posts.map((post) => (
                    <div key={post.id} className=' bg-white border b-2 rounded p-1 shadow-md'>
                        <div className='flex flex-row justify-between'>
                            <div>{post.author}</div>
                            <h2 className='text-black font-bold'>{post.title}</h2>
                            <div className=' text-black'>{post.date.toLocaleDateString() + " " + post.date.toLocaleTimeString()}</div>
                        </div>
                        <p className=' text-black'>{post.body}</p>
                        <CommentSection postid={post.id} user={user} />
                    </div>
                ))}
            </div>

            <div className='absolute right-20 bottom-0'>

                {!user ? (
                    <div className='text-red-500'>You must be logged in to post</div>
                ) : (
                    !createPostModal ? (<Button onClick={() => setCreatePostModal(true)} className='shadow-md mb-2'>Create Post</Button>)
                        : (
                            <>
                                <Button onClick={() => setCreatePostModal(false)} className='absolute right-3 top-3'>X</Button>
                                <CreatePost posts={posts} setPosts={setPosts} boardname={boardname} user={user} />
                            </>
                        )
                )
                }

            </div>
        </div>
    );
};

export default BoardView;