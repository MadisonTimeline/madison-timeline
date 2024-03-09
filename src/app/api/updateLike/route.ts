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
        const { error } = await supabase
            .from("users")
            .update({
                liked_posts: receivedData.liked_posts,
                disliked_posts: receivedData.disliked_posts
            })
            .eq("id", receivedData.userId)
        if (error) {
            console.error("Error inserting data:");
            console.error(error);
        }

        {
            // posts
            const { error } = await supabase
                .rpc('update_post_like_dislike', {
                    dislikes_change: receivedData.dislikeChange,
                    likes_change: receivedData.likeChange, 
                    post_id: receivedData.postId
                })
            if (error) {
                console.error("Error inserting data:");
                console.error(error);
            }

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