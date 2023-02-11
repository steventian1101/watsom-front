import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, } from "react-router-dom";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";

import { openSnackBar } from "../../redux/snackBarReducer";

function Header({ sidebarOpen, setSidebarOpen }) {
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
    <Navbar
        fluid={true}
        // rounded={true}
        className="pt-4"
    >
        <Navbar.Brand href="/" className="px-4" >
            <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                WatSom.@!
            </span>
        </Navbar.Brand>
        <div className="flex px-4 md:order-2">
            <div className="flex mx-6">
                <Button>
                    Try WatSom Pro
                </Button>
                <Navbar.Toggle />
            </div>
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} color="gray"/>}
            >
                <Dropdown.Header>
                    <span className="block text-sm">
                        Buttler Rhett
                    </span>
                    <span className="block truncate text-sm font-medium">
                        buttler.rhett@gmail.com
                    </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item>
                    Subscription
                </Dropdown.Item>
                <Dropdown.Item>
                    Sign out
                </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
        </div>
        {/* <Navbar.Collapse>
            <Navbar.Link
                href="/navbars"
                active={true}
            >
                Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">
                About
            </Navbar.Link>
            <Navbar.Link href="/navbars">
                Services
            </Navbar.Link>
            <Navbar.Link href="/navbars">
                Pricing
            </Navbar.Link>
            <Navbar.Link href="/navbars">
                Contact
            </Navbar.Link>
        </Navbar.Collapse> */}
    </Navbar>
  );
}

export default Header;
