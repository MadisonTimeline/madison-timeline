import React, { Suspense } from "react";
import ExploreBoardsView from "@/components/ExploreBoardsView";

export default function ExploreBoardsPage() {



    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ExploreBoardsView />
        </Suspense>

    );
}