"use client";
import React, { useState, useEffect, useMemo } from "react";
import CommentSection from "./CommentSection";
import { Post } from "@/types/Post";
import CreatePost from "./CreatePost";
import { Button } from "./ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import PostPreviewList from "./PostPreviewList";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

function BoardView({ boardname }: { boardname: string }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [numPosts, setNumPosts] = useState(0);
    const [createPostModal, setCreatePostModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading, user } = useKindeBrowserClient();
    const [isLocalLoading, setIsLocalLoading] = useState(true);
    const [numRefresh, setNumRefresh] = useState(0);

    const activePosts = useMemo(() => {
        return posts.slice((currentPage - 1) * 10, currentPage * 10);
    }, [posts, currentPage]);


    useEffect(() => {
        async function fetchAllPosts() {
            const response = await fetch("/api/posts/get/all");
            const data = await response.json();
            if (response.ok) {

                // Convert the date string to a Date object
                // for each post, set the date to a Date object
                const fetchedPosts = data.map((post: any) => {
                    post.date = new Date(post.date);
                    return post;
                });
                setPosts(fetchedPosts);
                setNumPosts(data.length);
                setTotalPages(Math.ceil(data.length / 10));
                setIsLocalLoading(false);
            } else {
                setIsLocalLoading(false);
            }
        }
        async function fetchPostsByBoard() {
            const response = await fetch(`/api/posts/get/board_name/${boardname}`);
            const data = await response.json();
            if (response.ok) {
                const fetchedPosts = data.map((post: any) => {
                    post.date = new Date(post.date);
                    return post;
                });
                setPosts(fetchedPosts);
                setNumPosts(data.length);
                setTotalPages(Math.ceil(data.length / 10));
                setIsLocalLoading(false);
            } else {
                setIsLocalLoading(false);
            }
        }
        if (boardname === "Home") {
            fetchAllPosts();
        } else {
            fetchPostsByBoard();
        }
    }, [boardname, numRefresh]);

    function handlePageChange(page: number) {
        if (page < 1 || page > totalPages) return;
        return () => {
            setCurrentPage(page);
        };
    }

    function getPagesToShow() {
        if (currentPage !== 0) {
            if (totalPages > 5) {
                if (currentPage < 3) {
                    return [1, 2, 3, 4, 5];
                } else if (currentPage > totalPages - 2) {
                    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
                }
            } else {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }
        } else {
            return [1];
        }
    }

    if (isLoading) return (
        <div className="flex flex-col justify-center align-center">
            Fetching User Data...
        </div>
    )

    if (isLocalLoading) return (
        <div className=" flex flex-col justify-center align-center">
            Fetching Posts...
        </div>
    );

    return (
        <div className=" flex flex-col justify-center align-center">
            {
                activePosts && <PostPreviewList user={user} posts={activePosts} numRefresh={numRefresh} setNumRefresh={setNumRefresh} />
            }
            <div className="fixed right-5 bottom-5">
                {!user ? (
                    <div className="text-red-500">You must be logged in to post</div>
                ) : !createPostModal ? (
                    <Button
                        onClick={() => setCreatePostModal(true)}
                        className="shadow-md mb-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
                    >
                        Create Post
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={() => setCreatePostModal(false)}
                            className="absolute right-3 top-3"
                        >
                            X
                        </Button>
                        <CreatePost
                            posts={posts}
                            setPosts={setPosts}
                            user={user}
                            setter={setCreatePostModal}
                        />
                    </>
                )}
            </div>

            <Pagination>
                <PaginationPrevious onClick={handlePageChange(currentPage - 1)} />
                <PaginationContent>
                    {
                        getPagesToShow().map((page) => {
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink onClick={handlePageChange(page)}>{page}</PaginationLink>
                                </PaginationItem>
                            );
                        })
                    }
                </PaginationContent>
                <PaginationNext onClick={handlePageChange(currentPage + 1)} />
            </Pagination>
        </div>
    );
}

export default BoardView;
