"use client";
import React, { useState, useEffect } from "react";
import CommentSection from "./CommentSection";
import { Post } from "@/types/Post";
import CreatePost from "./CreatePost";
import { Button } from "./ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import PostPreview from "./PostPreview";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

async function fetchPosts(boardname: string): Promise<Post[]> {
    const { data, error } = await supabase.from("posts").select().eq("board_name", boardname);

    if (error) {
        console.log("Error fetching posts:");
        console.error(error);
    }
    return data as Post[];
}

function BoardView({ boardname }: { boardname: string }) {
    const [posts, setPosts] = useState<Post[]>([]);

    const [createPostModal, setCreatePostModal] = useState(false);
    const { isLoading, user } = useKindeBrowserClient();

    // Use effect to fetch posts on mount
    useEffect(() => {
        fetchPosts(boardname).then(setPosts);
    }, [boardname]);

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className=" flex flex-col justify-center align-center m-10">
            <div className="h-[77vh] overflow-auto">
                {posts.map((post) => (
                    <PostPreview key={post.id} post={post} />
                    // <div key={post.id} className='bg-card-background border b-2 rounded p-1 shadow-md mb-2'>
                    //     <div className='flex flex-row justify-between'>
                    //         <div>{post.author}</div>
                    //         <h2 className='font-bold'>{post.title}</h2>
                    //         <div className=''>{post.date.toLocaleDateString() + " " + post.date.toLocaleTimeString()}</div>
                    //     </div>
                    //     <p className=''>{post.body}</p>
                    //     <CommentSection postid={post.id} user={user} />
                    // </div>
                ))}
            </div>

            <div className="absolute right-5 bottom-0">
                {!user ? (
                    <div className="text-red-500">You must be logged in to post</div>
                ) : !createPostModal ? (
                    <Button onClick={() => setCreatePostModal(true)} className="shadow-md mb-2">
                        Create Post
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => setCreatePostModal(false)} className="absolute right-3 top-3">
                            X
                        </Button>
                        <CreatePost posts={posts} setPosts={setPosts} boardname={boardname} user={user} />
                    </>
                )}
            </div>
        </div>
    );
}

export default BoardView;
