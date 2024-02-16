// Overlay Modal Menu on the left that appears when the user clicks on the menu icon
// This menu is used to navigate to different pages of the application

import React from "react";
import Link from "next/link";

interface OverlayMenuProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ( {show, setShow } ) => {
  return (
    <div
      className={`${
        show ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 h-full w-3/4 bg-[#ccc] z-50 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <Link href="/">Home</Link>
        <Link href="/boards/social">Social</Link>
        <Link href="/boards/notes">Notes</Link>
        <Link href="/boards/foods">Foods</Link>
      </div>
    </div>
  );
};