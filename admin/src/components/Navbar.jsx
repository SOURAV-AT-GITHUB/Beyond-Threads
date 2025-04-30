import { Dialog, Drawer, useMediaQuery } from "@mui/material";
import logo from "../assets/Images/logo.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADMIN_LOGOUT, OPEN_ALERT } from "../Store/actionTypes";
import SideNavbar from "./SideNavbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from '@mui/icons-material/Logout';
export default function Navbar() {
  const [isLogoutDialogOpen, setLogoutDialog] = useState(false);
  const openLogoutDialog = () => setLogoutDialog(true);
  const closeLogoutDialog = () => setLogoutDialog(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: ADMIN_LOGOUT });
    setTimeout(
      () =>
        dispatch({
          type: OPEN_ALERT,
          payload: { severity: "info", message: "Logged out successfully." },
        }),
      500
    );
  };
  const screen900 = useMediaQuery("(max-width:900px)");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  return (
    <nav className="py-2 px-4 sm:px-10 border-b border-headings w-full flex justify-between items-center">
      <div>
        <button onClick={openDrawer} className="md1:hidden">
          <MenuIcon />
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        <img src={logo} alt="" className="max-h-[50px]" />
        <div className="flex flex-col justify-center gap-0 p-1">
          <p className="text-2xl leading-5 font-semibold text-primary ">
            ADMIN
          </p>
          <p className="text-xs ">Beyond Threads</p>
        </div>
      </div>
      <button
        onClick={openLogoutDialog}
        className="hidden min-sm1:flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-lg cursor-pointer  "
      >
        <LogoutIcon/>
        <p>LOGOUT</p>
      </button>
      <Dialog open={isLogoutDialogOpen} onClose={closeLogoutDialog}>
        <div className="relative bg-white flex flex-col items-center gap-6 p-4 rounded-lg">
          <p className="text-2xl font-medium">Are you sure want to Logout ?</p>
          <div className="flex items-center gap-2 ">
            <button
              onClick={handleLogout}
              className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer"
            >
              LOGOUT
            </button>
            <button
              onClick={closeLogoutDialog}
              className="text-primary border border-primary py-2 px-4 rounded-lg cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </div>
      </Dialog>
      <Drawer open={Boolean(isDrawerOpen && screen900)} onClose={closeDrawer}>
        <div className="relative bg-white min-w-xs max-w-md h-full flex flex-col gap-3 p-2 overflow-y-auto">
          <button onClick={closeDrawer} className="self-end">
            <CloseIcon fontSize="large" />
          </button>
          <div className="flex items-center gap-1.5 self-center">
            <img src={logo} alt="" className="max-h-[70px]" />
            <div className="flex flex-col justify-center gap-1 p-1">
              <p className="text-3xl leading-5 font-semibold text-primary ">
                ADMIN
              </p>
              <p className="">Beyond Threads</p>
            </div>
          </div>
          <SideNavbar />
          <div className="absolute bottom-0 w-full left-0 p-2">
            <button
              onClick={openLogoutDialog}
              className="bg-primary text-white py-2 px-4 rounded-lg cursor-pointer w-full flex items-center justify-center gap-2"
            >
              <LogoutIcon/>
              <p>LOGOUT</p>
            </button>
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
