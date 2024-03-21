import { createClient } from "@/utils/supabase/client";
export async function GET(request: Request) {
    try {
        const receivedUserID = request.url.split('/').pop(); // Extracting user ID from URL
        const supabase = createClient();
        const { data, error } = await supabase
            .from("users")
            .select("picture, username")
            .eq("id", receivedUserID);

        if (error) {
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ username: "Get Profile Picture" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        } else {
            return new Response(
                JSON.stringify({ picture: data[0].picture, username: data[0].username }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        }

    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Error processing request" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 400
            }
        );
    }
}
