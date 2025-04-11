"use client"

import { useContext, useState } from 'react'
import SidebarContext from '@/context/SidebarContext'
import {
  SearchIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '@/icons'
import { Avatar } from '@roketid/windmill-react-ui'
import { useSession } from "next-auth/react";
import LevelBadge from "@/components/LevelBadge"
import { xpForLevel } from "@/utils/XP";


function Header() {
  const { toggleSidebar } = useContext(SidebarContext)
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* Mobile hamburger */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Spacing */}
        <div className="flex justify-center flex-1 lg:mr-32">
        </div>

          {/* Profile menu */}
          <ul className="flex items-center justify-right space-x-6">
            <li className="relative">
              <button
                className="rounded-full focus:shadow-outline-purple focus:outline-none"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
              ></button>

              {/* Profile avatar and info linking directly to /profile */}
              <li>
                <a
                  href="/profile"
                  aria-label="Account"
                  className="flex items-center space-x-4"
                >
                  <Avatar
                    className="align-middle cursor-pointer"
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name || "User"}
                    size="large"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-end justify-end ml-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {session?.user?.email}
                    </span>
                    <LevelBadge
                      level={session?.user?.level ?? 1}
                      xp={session?.user?.xp ?? 0}
                      xpForNextLevel={xpForLevel((session?.user?.level ?? 1) + 1)}
                    />
                  </div>
                </a>
              </li>
            </li>
          </ul>
      </div>
    </header>
  )
}

export default Header
