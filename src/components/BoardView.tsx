import React, { useState } from 'react';

function BoardView( { show, boardname }){
    const [posts, setPosts] = useState<Post[]>([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you'd also send this to your backend to store
        const newPost: Post = {
            id: posts.length + 1,
            title: postTitle,
            date: new Date(),
            board: boardname,
            body: postBody,

        };
        setPosts([...posts, newPost]);
        setPostTitle('');
        setPostBody('');
    };

    return (
        <div className=' flex flex-col justify-center align-center m-10'>
            <h1>{boardname}</h1>
            <div className='h-[41vh] overflow-auto'>
                {posts.map((post) => (
                    <div key={post.id} className='border b-1'>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className=' flex flex-col w-auto left-3 right-3'>
                <h2 
                className='text-xl font-bold text-center m-2 p-2 border b-1 rounded bg-white'
                >Create a new post</h2>
                <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className='w-full border b-1 p-2'
                    placeholder="Post Title"
                    required
                />
                <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    className='h-40 w-full resize-none border b-1 p-2'
                    placeholder="Post Body"
                    required
                />
                <button className="bg-white border b-1 mt-2" type="submit">Submit Post</button>
            </form>
        </div>
    );
};

export default BoardView;