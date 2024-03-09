import { createClient } from "@/utils/supabase/client";
export async function PUT(request: Request) {
    try {
        // Parse request body
        const receivedData = await request.json();

        // Log received data
        console.log("Received data:");
        console.log(receivedData);

        // Client-side Supabase query
        const supabase = createClient();


        // receive boolean like/dislike
        // liked/disliked arrays from front-end

        if (receivedData.like && receivedData.dislike) {
            console.error("Error updating like/dislike");
        }

        // users
        const { userError } = await supabase
            .from("users")
            .update({
                liked_posts: receivedData.liked_posts,
                disliked_posts: receivedData.disliked_posts
            })
            .eq("id", receivedData.userId)
        if (userError) {
            console.error("Error inserting data:");
            console.error(userError);
        }

        // posts
        const { postError } = await supabase
            .from("posts")
            .rpc('update_post_like_dislike', {
                dislikes_change: receivedData.dislikeChange,
                likes_change: receivedData.likeChange, 
                post_id: receivedData.postId
            })
        if (postError) {
            console.error("Error inserting data:");
            console.error(postError);
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