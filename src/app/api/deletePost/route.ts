// Import necessary dependencies
export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically
import { createClient } from "@/utils/supabase/client";

// Function to handle POST request
export async function POST(request: Request) {
    try {
        // Parse request body
        const receivedData = await request.json();

        // Log received data
        console.log("Received data:");
        console.log(receivedData);

        // Validate required fields
        const requiredFields = ['post_id', 'user_id'];
        for (const field of requiredFields) {
            if (!receivedData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Delete post data from Supabase database
        const supabase = createClient();
        {
            let { error } = await supabase
                .from('comments')
                .delete()
                .eq('post_id', receivedData.post_id)

            if (error) {
                throw new Error("Error deleting comments");
            }
        }

        let { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', receivedData.post_id)
            .eq('author_id', receivedData.user_id);


        // Check for errors during insertion
        if (error) {
            throw new Error("Error deleting post");
        }

        // Return success response to client
        return new Response(
            JSON.stringify({
                message: `Post Successfully deleted.`,
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200
            }
        );
    } catch (error) {
        // Return error response to client
        return new Response(
            JSON.stringify({ message: "Error processing request" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 400
            }
        );
    }
}
