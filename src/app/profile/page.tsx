// profile page
// this is where users will setup their profile information after sign up and data will be stored in supabase
'use client'
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Profile from "@/components/Profile";

export default function NewProfilePage() {
    const { user, isLoading, isAuthenticated } = useKindeBrowserClient();

    if (isLoading) return <div>Loading...</div>;

    if (isAuthenticated && user) {
        return (
            <Profile user={user}/>
        );
    }
}
