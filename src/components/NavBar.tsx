import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className='absolute top-0 w-full bg-[#ccc] px-[10px] py-[20px] flex justify-between align-center'>
            <Link href="/">Home</Link>
            <Link href="/boards/social">Social</Link>
            <Link href="/boards/notes">Notes</Link>
            <Link href="/boards/foods">Foods</Link>
        </nav>
    );
};

export default Navbar;
