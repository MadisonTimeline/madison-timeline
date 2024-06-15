import React, { useState, useEffect } from 'react'
import BoardView from '../BoardView'
import SkeletonPost from '../SkeletonPost'

export default function BoardPage({ name }: { name: string }) {
    const [boardName, setBoardName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        async function fetchBoard() {
            try {
                const response = await fetch(`/api/getBoard/${name}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setBoardName(data.name)
                    setDescription(data.description)
                    setLoading(false)
                } else {
                    console.error(data.message)
                    setError(true);
                }
            } catch (error) {
                console.error(error)
                setError(true);
            }
        }

        if (name)
            fetchBoard()
    }, [name])

    if (error) return (
        <div className='flex flex-row justify-center align-center'>
            <p className='text-xl'>OOPS!! an error has occurred while retrieving board data.</p>
        </div>
    )
    if (loading) return (
        <div className='flex flex-row justify-center align-center'>
            <SkeletonPost />
        </div>
    )
    return (
        <div className="min-h-screen flex flex-col">
            <div className='flex flex-col p-5 bg-accent h-[100px]'>
                <h1 className="text-4xl ">{boardName} Board</h1>
                <p>{description}</p>
            </div>
            <div>
                <BoardView boardname={boardName} />
            </div>
        </div>
    )
}