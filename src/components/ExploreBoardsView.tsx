'use client';
import React, { useEffect, useState } from 'react';
import BoardPreview from '@/components/BoardPreview';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import { SearchInput } from '@/components/search/SearchInput';
import { Board } from '@/types/Board';

export default function ExploreBoardsView() {
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        // Fetch boards from API
        fetch('/api/getAllBoards')
            .then((response) => response.json())
            .then((data) => setBoards(data));
    }, [boards]);
    const searchParams = useSearchParams();
    const searchQuery = searchParams && searchParams.get("q"); // we use `q` to set the query to the browser, it could be anything

    useEffect(() => {
        const handleSearch = () => {
            const findBoard = boards.filter((board) => {
                if (searchQuery) {
                    return (
                        board.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                } else {
                    // If no search query, return the original data
                    return true;
                }
            });
            // Set the filtered data to the state
            setBoards(findBoard);
        };
        // Call handleSearch when searchQuery changes
        handleSearch();

    }, [searchQuery]);



    const totalBoards = boards.length;

    return (

        <section className='m-10'>

                <SearchInput defaultValue={searchQuery} />


            <p className="mt-10 ">Showing {totalBoards} {totalBoards > 1 ? "Boards" : "Boards"}</p>

            {/* // Conditionally render the BoardPreviews */}

            <div className="mt-8">

                {totalBoards === 0 ? <p>No result returned</p> : (

                    // return the Board Previews here

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">

                        {boards.filter(x=> x.name !== "Home").map(({ name, description }: Board) => {
                            return (
                                <div key={name}>
                                    <BoardPreview name={name} description={description} />
                                </div>
                            )
                        })}
                    </div>
                )}


            </div>

        </section>

    )
}