import { createClient } from "@/utils/supabase/client";
export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically

export async function GET(request: Request) {
    try {
        const receivedPostID = request.url.split('/').pop(); // Extracting post ID from URL
        const supabase = createClient();
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", receivedPostID);

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
                JSON.stringify(data),
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
                status: 500
            }
        );
    }
}
