// src/routes/adminSidebar.tsx
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import type { ComponentType, SVGProps } from 'react'

interface IRoute {
  path?: string
  icon?: ComponentType<SVGProps<SVGSVGElement>> // ✅ FIXED: Icon is a component!
  name: string
  routes?: IRoute[]
  checkActive?(pathname: string, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive(pathname: string, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname === route?.path
    : route?.path ? pathname.indexOf(route.path) === 0 : false
}

const routes: IRoute[] = [
  {
    path: '/admin',
    icon: HomeIcon,
    name: 'Dashboard',
  },
  {
    path: '/admin/stats',
    icon: ChartBarIcon,
    name: 'Statistics',
  },
]

export type { IRoute }
export default routes
