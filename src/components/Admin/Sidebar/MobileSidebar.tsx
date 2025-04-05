"use client"

import React, { useContext, useRef } from 'react'
import SidebarContext from '@/context/SidebarContext'
import SidebarContent from './SidebarContent'
import classNames from 'classnames'

function MobileSidebar() {
  const sidebarRef = useRef(null)
  const { isSidebarOpen, closeSidebar, saveScroll } = useContext(SidebarContext)

  const linkClickedHandler = () => {
    saveScroll(sidebarRef.current)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={classNames(
          "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-150",
          {
            hidden: !isSidebarOpen,
          }
        )}
        onClick={closeSidebar}
      />

      {/* Sidebar Panel */}
      <aside
        id="mobileSidebar"
        ref={sidebarRef}
        className={classNames(
          "fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 transform transition-transform duration-150 lg:hidden",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <SidebarContent linkClicked={linkClickedHandler} />
      </aside>
    </>
  )
}

export default MobileSidebar
