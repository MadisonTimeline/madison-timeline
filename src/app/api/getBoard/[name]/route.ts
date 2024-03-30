import { createClient } from "@/utils/supabase/client";
export const dynamic = "force-dynamic"; // Use this if you need to ensure the function is always executed dynamically

export async function GET(request: Request) {
    try {
        const receivedBoardName = request.url.split('/').pop(); // Extracting board name from URL
        const supabase = createClient();

        if (!receivedBoardName) {
            return new Response(
                JSON.stringify({ message: "Board Name not Provided" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 400
                }
            );
        }

        const { data, error } = await supabase
            .from("boards")
            .select("*")
            .ilike("name", receivedBoardName);

        if (error) {
            throw new Error(error.message);
        }

        if (!data || data.length === 0) {
            return new Response(
                JSON.stringify({ message: "Board not found" }),
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
        console.error("Error processing request:", error);
        return new Response(
            JSON.stringify({ message: "Error processing request" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500
            }
        );
    }
}
