import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { MoreVertical, ChevronLast, ChevronFirst, BookmarkPlus } from "lucide-react";
import Image from "next/image";
import logo from '../../Logo.png';
import photo from '../../BuckyBadger.png';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from '../ui/button';
const SidebarContext = createContext();

export default function Sidebar({ show, setter }) {
  const [expanded, setExpanded] = useState(true);
  const { isLoading, user } = useKindeBrowserClient();

  const sidebarClasses = `h-screen flex flex-col bg-white border-r shadow-sm ${expanded ? "w-64" : "w-20"}`;

  const MenuItem = ({ icon, name, route }) => {
    const menuItemClasses = `text-sm flex gap-1 items-center text-md p-3 border-b border-b-white/10 transition-colors duration-300 ease-in-out ${expanded ? "pl-6 py-3 hover:bg-[#C5050C] hover:text-white active:bg-[#C5050C] active:text-white" : "justify-center"}`;

    return (
      <Link href={route} onClick={() => setter(oldVal => !oldVal)} className={menuItemClasses}>
          <div className="text-xl small-icon">{icon}</div>
          {expanded && <div>{name}</div>}
      </Link>
    );
  };


  return (
    <aside className={sidebarClasses}>
      <div className="p-4 pb-2 flex justify-between items-center">
        <Link href="/" className={`overflow-hidden transition-all ${expanded ? "w-50" : "w-0"} p-1`}>
            <Image src={logo} width={200} height={200} alt="Logo" />
        </Link>
        <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <SidebarContext.Provider value={{ expanded }}>
        <ul>
        <MenuItem
              name="Home"
              route="/boards"
              icon={<HomeRoundedIcon />}
            />
            <MenuItem
              name="Profile"
              route="/profile"
              icon={<AccountCircleRoundedIcon />}
            />
            <hr className='my-2'></hr>
            <MenuItem
              name="Search Boards"
              route="/explore-boards"
              icon={<SearchIcon />}
            />
            <MenuItem
              name="My Posts"
              route="/my-posts"
              icon={<NoteAltIcon />}
            />
            <MenuItem
              name="My Comments"
              route="/my-comments"
              icon={<CommentIcon />}
            />
            <MenuItem
              name="My Favorite Boards"
              route="/my-boards"
              icon={<BookmarksIcon />}
            />
            <hr className='my-2'></hr>
            <MenuItem
              name="Notification"
              route="/notification"
              icon={<NotificationsIcon />}
            />
            <MenuItem
              name="Setting"
              route="/setting"
              icon={<SettingsIcon />}
            />
        </ul>
      </SidebarContext.Provider>
      <div className="flex-grow overflow-auto">
      {expanded && (
      <div className={`flex flex-col p-5 space-y-2 mb-2`}>
      { isLoading ? ( <div>Loading...</div>) : (
            !user ? (
            <>
            <Button>
              <LoginLink postLoginRedirectURL="/loginpage">LOG IN</LoginLink>
            </Button>
            <Button>
              <RegisterLink postLoginRedirectURL="/profile">SIGN UP</RegisterLink>
            </Button>
            </>
            ) : (
              <Button>
                <LogoutLink>LOG OUT</LogoutLink>
              </Button>
            )
            )
          }
      </div>
      )}</div>
      <div className="border-t flex p-3">
        <Image
          src={photo}
          alt=""
          className="w-10 h-10 rounded-md"
        />
        <div
          className={`
            flex justify-between items-center
            overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
        `}
        >
        <div className="leading-4">
          <h4 className="font-semibold">Bucky Badger</h4>
          <span className="text-xs text-gray-600">bucky@wisc.edu</span>
        </div>
        <MoreVertical size={20} />
        </div>
        </div>
    </aside>
  );
}

// export function SidebarItem({ icon, text, active, alert }) {
//   const { expanded } = useContext(SidebarContext);

//   return (
//     <li
//       className={`
//         relative flex items-center py-2 px-3 my-1
//         font-medium rounded-md cursor-pointer
//         transition-colors group
//         ${
//           active
//             ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//             : "hover:bg-indigo-50 text-gray-600"
//         }
//     `}
//     >
//       {icon}
//       <span
//         className={`overflow-hidden transition-all ${
//           expanded ? "w-52 ml-3" : "w-0"
//         }`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//             expanded ? "" : "top-2"
//           }`}
//         />
//       )}

//       {!expanded && (
//         <div
//           className={`
//           absolute left-full rounded-md px-2 py-1 ml-6
//           bg-indigo-100 text-indigo-800 text-sm
//           invisible opacity-20 -translate-x-3 transition-all
//           group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
//       `}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   );
// }
