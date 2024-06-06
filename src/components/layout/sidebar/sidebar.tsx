"use client";
import { useState, useRef } from "react";
// import photo from '../../../BuckyBadger.png';
import Image from "next/image";
import { Button } from "../../ui/button";
import "./styles.css";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RegisterIcon from '@mui/icons-material/AssignmentInd';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
const navItems = [
    { icon: <HomeRoundedIcon />, text: "Home", href: "/" },
    { icon: <AccountCircleRoundedIcon />, text: "Profile", href: "/profile" },
    { icon: <SearchIcon />, text: "Explore Boards", href: "/explore-boards" },
    { icon: <NoteAltIcon />, text: "My Posts", href: "/my-posts" },
    { icon: <CommentIcon />, text: "My Comments", href: "/my-comments" },
    { icon: <BookmarksIcon />, text: "My Favorite Boards", href: "/my-favorite-boards" },
    { icon: <NotificationsIcon />, text: "Notification", href: "/notification" },
    { icon: <SettingsIcon />, text: "Setting", href: "/setting" },
];





export const Sidebar = () => {
    // const { isLoading, user } = useKindeBrowserClient();
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, user } = useKindeBrowserClient();
    const router = useRouter();

    const handleClickLogo = () => {
        console.log("Logo clicked");
        // go to home page
        window.location.href = "/";

    }

    const handleClickNavItem = (href:string) => {
        console.log("NavItem clicked");
        // go to home page
        window.location.href = href;
    }

    const handleLogOut = () => {
        router.push('/api/auth/logout');
    }
    const handleLogIn = () => {
        router.push('/api/auth/login')
    }
    const handleRegister = () => {
        router.push('/api/auth/register?post_login_redirect_url=/profile')
    }

    return (
        <section className="sidebar-2-page">
            <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}
                onMouseOver={() => setIsOpen(true)}
                onMouseOut={() => setIsOpen(false)}
            >
                <div className="inner">
                    <header>
                        <button
                            type="button"
                            className="sidebar-2-burger"
                            onClick={handleClickLogo}
                        >
                            <span className="material-symbols-outlined">
                                <Image src={"/MadTaLogo.png"} width={200} height={200} alt="Logo" />
                            </span>
                        </button>
                        <text className="ml-2"> Madison Timeline</text>
                    </header>
                    <nav>
                        {navItems.map((item) => (
                            <button key={item.href} type="button" onClick={() => handleClickNavItem(item.href)}>
                                <span className="material-symbols-outlined" >{item.icon}</span>
                                <p>{item.text}</p>
                            </button>
                        ))}


                    </nav>
                    <nav>
                        {isLoading && <div>Loading...</div>}
                        {!isLoading && user && <button key="Log Out" type="button" onClick={handleLogOut}>
                            <span className="material-symbols-outlined" ><LogoutIcon /></span>
                            <p>Log Out</p>
                        </button>}

                        {!isLoading && !user && <button key="Log In" type="button" onClick={handleLogIn}>
                            <span className="material-symbols-outlined" ><LoginIcon /></span>
                            <p>Log In</p>
                        </button>}
                        {!isLoading && !user && <button key="Sign Up" type="button" onClick={handleRegister}>
                            <span className="material-symbols-outlined" ><RegisterIcon /></span>
                            <p>Sign Up</p>
                        </button>}
                    </nav>


                </div>
            </aside>
        </section >
    );
};