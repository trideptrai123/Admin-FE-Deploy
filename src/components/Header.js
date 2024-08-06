import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  Input,
  WindmillContext,
} from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  OutlineLogoutIcon,
  OutlinePersonIcon,
  SearchIcon,
  SunIcon
} from "../icons";
import response from "../utils/demo/profileData";
import { logout } from "../utils/helper";
import useAuthStore from "../zustand/authStore";
import { LOCAL_STORAGE_KEY } from "../api";

function Header() {
  const { user, getInfoUser,logOutAction:handleLogoutStore } = useAuthStore();
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const history = useHistory()
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }
const handleLogout = () => {
  logout(false);
  handleLogoutStore()
  localStorage.removeItem(LOCAL_STORAGE_KEY.token)
  history.push("/login")
}
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            {/* <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div> */}
            {/* <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            /> */}
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          {/* <!-- Notifications menu --> */}
          <li style={{
            display:"none"
          }} className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem
                tag="a"
                href="/app/chats"
                className="justify-between"
              >
                <span>Messages</span>
                <Badge type="danger">13</Badge>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/app/orders"
                className="justify-between"
              >
                <span>Sales</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert("Alerts!")}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none flex items-center"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle mr-2"
                src={user?.avatar || "/avt.png"}
                alt=""
                aria-hidden="true"
              />{user?.name}
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="/app/manage-profile">
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Trang cá nhân</span>
              </DropdownItem>
           
             
              <DropdownItem onClick={() => history.push("/app/change-pass")}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Đổi mật khẩu</span>
              </DropdownItem>
              <DropdownItem onClick={() => handleLogout()}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Đăng xuất</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
