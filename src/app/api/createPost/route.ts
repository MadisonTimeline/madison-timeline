// api/createPost

export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically
import { createClient } from "@/utils/supabase/client";

// Import types for Request and Response if needed
// import { Request, Response } from '...';

export async function POST(request: Request) {
    try {
        // Parse request body
        const receivedData = await request.json();

        // Log received data
        console.log("Received data:");
        console.log(receivedData);

        // Client-side Supabase query
        const supabase = createClient();
        const { data, error } = await supabase
            .from("posts")
            .insert({
                id: receivedData.id,
                title: receivedData.title,
                date: receivedData.date,
                board_name: receivedData.board_name,
                body: receivedData.body,
                likes: receivedData.likes,
                dislikes: receivedData.dislikes,
                views: receivedData.views,
                author_id: receivedData.authorId,
                liked_users: receivedData.liked_users,
                disliked_users: receivedData.disliked_users,
            })
            .select();
        if (error) {
            console.error("Error inserting data:");
            console.error(error);
        }

        // Log inserted data
        console.log("Inserted data:");
        const insertedData = data ? data[0] : null;
        console.log(insertedData);

        // Return response
        return new Response(
            JSON.stringify({
                message: `Server received post from board [${insertedData.board_name}] by [${insertedData.author_id}] successfully.`,
                post: insertedData,
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            // Handle any errors
            return new Response(JSON.stringify({ message: "Error processing request", error: error.message }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        } else {
            // Handle the case where the error is not an Error object
            console.log("An unknown error occurred");
            return new Response(JSON.stringify({ message: "An unknown error occurred" }), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
        }
    }
}
