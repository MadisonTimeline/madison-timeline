import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Post } from "@/types/Post";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreatePost({
    posts,
    setPosts,
    boardname,
    user,
    setter,
}: {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    boardname: string;
    user: any;
    setter: any;
}) {
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newPost: Post = {
            id: uuidv4(),
            title: postTitle,
            date: new Date(),
            board_name: boardname,
            body: postBody,
            likes: 0,
            dislikes: 0,
            views: 0,
            author_id: user.id,
            liked_users: [],
            disliked_users: [],
        };

        const response = await fetch("/api/createPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });

        if (response.ok) {
            const createPostResponse = await response.json();
            const postData = createPostResponse.post;

            console.log(createPostResponse.message);
            console.log(createPostResponse.post);

            // Convert the date string to a Date object
            if (postData && postData.date) {
                postData.date = new Date(postData.date);
            }

            setPosts([...posts, postData]);
        } else {
            // Handle errors
            console.error("Failed to create post");
        }

        setPostTitle("");
        setPostBody("");
        setter(false); // Close the modal
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Title</Label>
                            <Input id="name" placeholder="Title" onChange={(e) => setPostTitle(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <textarea
                                id="body"
                                placeholder="What's on your mind?"
                                onChange={(e) => setPostBody(e.target.value)}
                                className="p-2 h-[350px] bg-white font-lg border border-border rounded-md focus:outline-none ring-none"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSubmit}>Post</Button>
            </CardFooter>
        </Card>
    );
}
