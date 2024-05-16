"use client";
import React, { useState, useEffect } from "react";
import { Post } from "@/types/Post";
import PostPreview from "./PostPreview";
import GuestPostPreview from "./GuestPostPreview";

function PostPreviewList({ user, posts, numRefresh, setNumRefresh}: { user: any, posts: Post[], numRefresh: number, setNumRefresh: Function}) {
    const [ needRefresh, setNeedRefresh ] = useState(false);

    useEffect(() => {
        if(needRefresh) {
            setNumRefresh(numRefresh + 1);
            setNeedRefresh(false);
        }
    }, [needRefresh, numRefresh, setNumRefresh]);
          
    return (
            <div className="h-[77vh] overflow-auto gap-3 xl:max-w-[calc(100vw-250px)] md:max-w-[calc(100vw-250px)] sm:max-w-[100vw]">
                {user
                    ? posts && posts.map((post) => <PostPreview key={post.id} post={post} user={user} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>)
                    : posts && posts.map((post) => <GuestPostPreview key={post.id} post={post} />)}
            </div>

    );
}

export default PostPreviewList;
