// returns all posts
import { createClient } from "@/utils/supabase/client";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("date", { ascending: false })
            .limit(500);

        if (error) {
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ message: "No post found" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        } else {
            
            // // for each post, set the date to a Date object
            // const fetchedPosts = data.map((post: any) => {
            //     post.date = new Date(post.date);
            //     return post;
            // } );
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
                status: 400
            }
        );
    }
}
    