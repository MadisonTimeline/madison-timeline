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
        const requiredFields = ['id', 'username', 'email', 'given_name', 'family_name', 'picture'];
        for (const field of requiredFields) {
            if (!receivedData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Insert user data into Supabase database
        const supabase = createClient();
        const { data, error } = await supabase
            .from("users")
            .upsert({
                id: receivedData.id,
                email: receivedData.email,
                username: receivedData.username,
                given_name: receivedData.given_name,
                family_name: receivedData.family_name,
                picture: receivedData.picture
            })
            .select();

        // Check for errors during insertion
        if (error) {
            console.error("Error inserting data:");
            console.error(error);
            throw new Error("Error inserting user data");
        }
          
        // Return success response to client
        return new Response(
            JSON.stringify({
                message: `User [${receivedData.email}] created successfully.`,
                user: data
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200
            }
        );
    } catch (error) {
        // Return error response to client
        return new Response(
            JSON.stringify({ message: "Error processing request"}),
            {
                headers: { "Content-Type": "application/json" },
                status: 400
            }
        );
    }
}
