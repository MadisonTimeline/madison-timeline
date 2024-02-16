import React from 'react'
import Link from 'next/link'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function MenuBarMobile({ setter }: { setter: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <MenuRoundedIcon />
            </button>
            <div className="p-2 flex flex-row mx-auto">
                <Link href="/">
                    {/*eslint-disable-next-line*/}
                    {/* <img src={logo.src} alt="Company Logo" width={300} height={300} /> */}
                    <div className='border rounded-full p-1 bg-[#C5050C] font-bold text-white'>MT</div>
                </Link>
                <div className='p-1 text-white'>Madison Timeline</div>
            </div>
            <Link
                className="text-3xl flex text-white"
                href="/login"
            >
                <AccountCircleRoundedIcon />
            </Link>
        </nav>
    )
}