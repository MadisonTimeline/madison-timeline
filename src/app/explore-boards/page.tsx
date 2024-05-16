import React, { Suspense } from "react";
import ExploreBoardsView from "@/components/ExploreBoardsView";
import Layout from "@/components/layout/NewLayout";

export default function ExploreBoardsPage() {



    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <ExploreBoardsView />
            </Suspense>
        </Layout>
    );
}