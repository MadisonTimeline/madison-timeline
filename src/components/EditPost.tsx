import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function EditPost({
    postid,
}: {
    postid: string;
}) {
    const { user } = useKindeBrowserClient();
    const [postTitle, setPostTitle] = useState("loading...");
    const [postBody, setPostBody] = useState("loading...");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/getPost/${postid}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch post");
                }
                const data = await response.json();
                setPostTitle(data.title);
                setPostBody(data.body);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPost();
    }, [postid]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const editedPost = {
            post_id: postid,
            title: postTitle,
            body: postBody,
            user_id: user.id,
        };
        console.log("Edited post:", editedPost);

        try {
            setIsLoading(true);
            const response = await fetch("/api/editPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedPost),
            });
            if (!response.ok) {
                throw new Error("Failed to edit post");
            }
            console.log("Post edited successfully");
        } catch (error) {
            console.error("Failed to edit post:", error);
        } finally {
            setIsLoading(false);
        }
    };
    if (!user) {
        return <div>Not authenticated</div>;
    }
    return (
        <Card className="w-full max-w-[350px]">
            <CardHeader>
                <CardTitle>Edit Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Title</Label>
                            <Input id="name" placeholder="Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <textarea
                                id="body"
                                placeholder="What's on your mind?"
                                value={postBody}
                                onChange={(e) => setPostBody(e.target.value)}
                                className="p-2 h-[350px] bg-white font-lg border border-border rounded-md focus:outline-none ring-none"
                            />
                        </div>
                    </div>
                    <CardFooter className="flex justify-end mt-4">
                        <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Post"}</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
