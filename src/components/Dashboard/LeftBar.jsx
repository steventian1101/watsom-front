import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, } from "react-router-dom";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";

import { openSnackBar } from "../../redux/snackBarReducer";

function LeftBar({ sidebarOpen, setSidebarOpen }) {
  const { t } = useTranslation();
  const { authState } = useSelector(
    (state) => state
  );

  const { loggedIn, userInfo } = authState;
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  return (
    <div className="h-full bg-gray-400">
        <div className="flex">
            <Avatar 
                alt="User settings" 
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                rounded={true} 
                color="gray"
                className="xs"
            />
            Free Plan
        </div>
    </div>
  );
}

export default LeftBar;
