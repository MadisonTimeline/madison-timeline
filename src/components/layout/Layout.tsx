import React, { useState } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';


// should fix layout so that it is separate from its children
// should separate all useState and useEffect hooks into their own components
export default function Layout({ pageTitle, children }: { pageTitle: string, children: React.ReactNode }) {

    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className="min-h-screen min-w-screen">
                <div className="flex">
                    <MenuBarMobile setter={setShowSidebar} />
                    <Sidebar show={showSidebar} setter={setShowSidebar} />
                    <div className="flex flex-col flex-grow justify-center align-center bg-background w-screen md:w-full min-h-screen">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}