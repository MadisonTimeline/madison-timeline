"use client";
import React, { useState, useEffect } from 'react';
import PostPreview from '../PostPreview';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function MyPostsList( ) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [needReload, setNeedReload] = useState(false);

    const { user } = useKindeBrowserClient();


    // get user's posts
    useEffect(() => {
        // fetch posts
        async function fetchAllUserPosts() {
            if (!user) {
                return;
            }
            const response = await fetch(`/api/posts/get/user_id/${user.id}`);
            const data = await response.json();

            const fetchedPosts = data.map((post: any) => {
                return post;
            });

            if (response.ok) {
                setPosts(fetchedPosts);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.log("Error fetching posts");
            }
        }
        fetchAllUserPosts();
    }, [ user ]);

    useEffect(() => {
        if (needReload) {
            setNeedReload(false);
        }
    } , [needReload]);



    if (!user) {
        return (
            <div>
                <p>You must be logged in to view your posts.</p>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div>
            {
                posts.length === 0 && (
                    <div>
                        <p>You have not created any posts yet.</p>
                    </div>
                )
            
            }
            {posts.map((post) => <PostPreview key={post.id} post={post} user={user} needRefresh={needReload} setNeedRefresh={setNeedReload} />)}
        </div>
    )


}