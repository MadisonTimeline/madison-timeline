// api/createComment

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
            .from("comments")
            .insert({
                id: receivedData.id,
                post_id: receivedData.post_id,
                date: receivedData.date,
                content: receivedData.content,
                author_id: receivedData.author_id,
            })
        if (error) {
            console.error("Error inserting data:");
            console.error(error);
        }

        // Return response
        return new Response(
            JSON.stringify({
                message: `Server received comment from post ${receivedData.post_id} by user ${receivedData.author_id}`,

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
