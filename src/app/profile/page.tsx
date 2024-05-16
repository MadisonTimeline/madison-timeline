// profile page
// this is where users will setup their profile information after sign up and data will be stored in supabase
'use client'
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Profile from "@/components/Profile";
import Layout from "@/components/layout/NewLayout";

export default function NewProfilePage() {
    const { user, isLoading, isAuthenticated } = useKindeBrowserClient();

    if (!user) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center">
                    <div className="text-lg">You must be logged in to change profile info.</div>
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout>
                <Profile user={user} />
            </Layout>
        );
    }
}
