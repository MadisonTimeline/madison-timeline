import { createClient } from "@/utils/supabase/client";

export async function GET(request: Request) {
    try {
        const receivedUserID = await request.json();

        const supabase = createClient();
        const { data } = await supabase
            .from("users")
            .select("username")
            .eq("id", receivedUserID.id);

        if (!data) {
            return new Response(
                JSON.stringify({ username : " Set Username "}),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        }else {
            return new Response(
                JSON.stringify({ username: data[0].username }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 200
                }
            );
        }

    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Error processing request"}),
            {
                headers: { "Content-Type": "application/json" },
                status: 400
            }
        );
    }


}