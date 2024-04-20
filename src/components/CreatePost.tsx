import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Post } from "@/types/Post";
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import SelectBoards from "./SelectBoards";
import Editor from './Editor';

export default function CreatePost({
    posts,
    setPosts,
    user,
    setter,
}: {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    user: any;
    setter: any;
}) {
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [selectedBoardname, setSelectedBoardname] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if( selectedBoardname.length === 0) {
            alert("Please select a board");
            return;
        }
        
        const newPost: Post = {
            id: uuidv4(),
            title: postTitle,
            date: new Date(),
            board_names: selectedBoardname,
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

    const handleCancel = () => {
        window.history.back(); // Navigate back to the previous page
    };

    return (
        <Card className="w-[1000px]">
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="boardname">Board</Label>
                            <SelectBoards
                                boardnames={selectedBoardname}
                                setBoardnames={setSelectedBoardname}
                            />
                            <Label htmlFor="name">Title</Label>
                            <Input id="name" placeholder="Title" onChange={(e) => setPostTitle(e.target.value)} />
                        </div>
                        <div className="">
                            <Label htmlFor="body">Body</Label>
                            {/* Use the Editor component for the post body */}
                            <Editor></Editor>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Post</Button>
            </CardFooter>
        </Card>
    );
}
