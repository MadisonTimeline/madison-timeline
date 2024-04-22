import { createClient } from "@/utils/supabase/client";
export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically

export async function GET(request: Request) {
    try {
        const receivedUserID = request.url.split('/').pop(); // Extracting user ID from URL
        const supabase = createClient();
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("author_id", receivedUserID);
            .order("date", { ascending: false });

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
            const fetchedPosts = data.map((post: any) => {
                post.date = new Date(post.date);
                return post;
            } );
            
            return new Response(
                JSON.stringify(fetchedPosts),
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
