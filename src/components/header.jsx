"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "../hooks/use-scroll";
import { cn } from "../lib/utils";
import { getUser } from "../function/userInfo";
import { Icon } from "@iconify/react";
import { logout } from "../function/loginSystem";

const Header = () => {
  const [user, setUser] = useState("");
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

    useEffect(() => {
    const logUserInfo = async () => {
      const userInfo = await getUser();
      await setUser(userInfo.user.firstname + " " + userInfo.user.lastname);
    };

    logUserInfo();
  }, []);

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex items-center gap-2">
            <span>{user} </span>
            <form action={logout}>
              <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center hover:bg-red-400">
                <button className="font-semibold text-lg cursor-pointer">
                  <Icon icon="uil:signout"/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
