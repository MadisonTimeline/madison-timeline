import { createClient } from "@/utils/supabase/client";
export async function GET(request: Request) {
    try {
        const receivedPostID = request.url.split('/').pop(); // Extracting user ID from URL
        const supabase = createClient();
        const { data, error } = await supabase
            .from("posts")
            .select("title", "date", "body", "likes", "dislikes", "views", "board_name")
            .eq("id", receivedPostID);

        if (error) {
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ message: "Post not found" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 404
                }
            );
        } else {
            return new Response(
                JSON.stringify(data[0]),
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
