// Import necessary dependencies
export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically
import { createClient } from "@/utils/supabase/client";

// Function to handle POST request
export async function POST(request: Request) {
    try {
        // Parse request body
        const receivedData = await request.json();

        // Validate required fields
        const requiredFields = ['id', 'post_id', 'date', 'content', 'author_id', 'edited'];
        for (const field of requiredFields) {
            if (!receivedData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Delete post data from Supabase database
        const supabase = createClient();
        const { error } = await supabase
            .from('comments')
            .update({
                content: receivedData.content,
                edited: receivedData.edited,
            })
            .eq('id', receivedData.id)
            .eq('author_id', receivedData.author_id)
            .eq('post_id', receivedData.post_id);



        // Check for errors during update
        if (error) {
            throw new Error("Error updating user data");
        }

        // Return success response to client
        return new Response(
            JSON.stringify({
                message: `Comment Successfully updated.`,
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
