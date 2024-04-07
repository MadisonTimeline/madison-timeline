// Import necessary dependencies
export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically
import { createClient } from "@/utils/supabase/client";

// Function to handle POST request
export async function POST(request: Request) {
    try {
        // Parse request body
        const receivedData = await request.json();

        // Validate required fields
        const requiredFields = ['post_id'];
        for (const field of requiredFields) {
            if (!receivedData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Insert user data into Supabase database
        const supabase = createClient();
        let { data, error } = await supabase
            .rpc('update_post_views', {
                change: 1,
                post_id: receivedData.post_id
            });

        // Response to client

        return new Response(
            JSON.stringify({
                message: `Post views updated successfully.`,
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
