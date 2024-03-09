import { createClient } from "@/utils/supabase/client";
export async function GET(request: Request) {
    try {
        const receivedUserID = request.url.split('/').pop(); // Extracting user ID from URL
        const supabase = createClient();
        const { data, error } = await supabase
            .from("users")
            .select(["liked_posts", "disliked_posts"])
            .eq("id", receivedUserID);

        if (error) {
            throw new Error(error.message);
        }


        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ liked_posts: [], disliked_posts: [] }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        } else {
            return new Response(
                JSON.stringify({ liked_posts: data[0].liked_posts, disliked_posts: data[0].disliked_posts }),
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
