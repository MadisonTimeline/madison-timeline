"use client";
import React, { useState, useEffect } from "react";
import MenuBarMobile from "./MenuBarMobile";
import Sidebar from "./Sidebar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const { isLoading, user } = useKindeBrowserClient();

    return (
        <div className="min-h-screen min-w-screen">
            <div className="flex">
                <MenuBarMobile setter={setShowSidebar} />
                <Sidebar show={showSidebar} setter={setShowSidebar} />
                <div className="flex flex-col flex-grow justify-center align-center bg-background w-screen md:w-full min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}