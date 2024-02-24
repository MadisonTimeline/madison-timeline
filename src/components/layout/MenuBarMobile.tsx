import React from 'react'
import Link from 'next/link'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";


export default function MenuBarMobile({ setter }: { setter: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { isLoading, user } = useKindeBrowserClient();

    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-accent flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <MenuRoundedIcon color='action' />
            </button>
            <div className="p-2 flex flex-row mx-auto">
                <Link href="/">
                    {/*eslint-disable-next-line*/}
                    {/* <img src={logo.src} alt="Company Logo" width={300} height={300} /> */}
                    <div className='border rounded-full p-1 bg-[#C5050C] font-bold text-white'>MT</div>
                </Link>
                <div className='p-1 text-black'>Madison Timeline</div>

            </div>
            <div className='text-white'>
                {
                    user ? (
                        <LogoutLink >
                            <AccountCircleRoundedIcon color='action'/>
                        </LogoutLink>
                    ) : (
                        <RegisterLink >
                            <AccountCircleRoundedIcon color='action' />
                        </RegisterLink>
                    )
                }
            </div>

        </nav>
    )
}