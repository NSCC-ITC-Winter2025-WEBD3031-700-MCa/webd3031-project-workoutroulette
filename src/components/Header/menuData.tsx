import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Start Workout",
    path: "/workout",
    newTab: false,
  },
  {
    id: 6,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "About",
        path: "/about",
        newTab: false,
      }, 
      {
        id: 62,
        title: "Subscribe",
        path: "/pricing",
        newTab: false,
      },
      {
        id: 63,
        title: "Team",
        path: "/team",
        newTab: false,
      },
      {
        id: 66,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 67,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      
    ],
  },
];
export default menuData;
