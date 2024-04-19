// create post page
// this is where users will create a post and data will be stored in supabase
'use client'
import { useState } from "react";
import CreatePost from "@/components/CreatePost";
import { Post } from "@/types/Post";

export default function CreatePostPage() {
    const [posts, setPosts] = useState<Post[]>([]); // Specify the type of the state variable

    const handleSetPosts = (newPosts: Post[]) => {
        setPosts(newPosts);
    };

    const [show, setShow] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <CreatePost posts={posts} setPosts={handleSetPosts} user={{ id: 1 }} setter={setShow} />
        </div>
    );
}