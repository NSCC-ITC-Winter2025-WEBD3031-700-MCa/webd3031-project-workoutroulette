"use client"

import { useContext, useState } from 'react'
import SidebarContext from '@/context/SidebarContext'
import {
  SearchIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '@/icons'
import { Avatar, Dropdown, DropdownItem } from '@roketid/windmill-react-ui'
import { useSession } from "next-auth/react";

function Header() {
  const { toggleSidebar } = useContext(SidebarContext)
  const { data: session } = useSession();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* Optional Search */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
              type="text"
              placeholder="Search by name or email"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

            />
          </div>
        </div>

        {/* Profile menu */}
        <ul className="flex items-center space-x-6">
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
            </button>
            {/* Profile avatar linking directly to /profile */}
            <ul className="flex items-center space-x-6">
              <li>
                <a href="/profile" aria-label="Account">
                  <Avatar
                    className="align-middle cursor-pointer"
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name || "User"}
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
