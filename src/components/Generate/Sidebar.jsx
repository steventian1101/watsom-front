import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
import UserMenu from '../theme/DropdownProfile';

import { TextInput } from 'flowbite-react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { MdOutlineExpandMore, MdOutlineChevronRight } from "react-icons/md"
import { HiOutlineSearch } from 'react-icons/hi';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  const [search, setSearch] = useState("");   //search bar text 

  const { t } = useTranslation();
  const navigate = useNavigate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  const keyDownSearch = (e) => {
    if (e.keyCode === 13) {
      if (search.trim()) {
        
      }
    }
  }

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      {/* <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div> */}

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-full lg:w-full lg:sidebar-expanded:!w-full 2xl:!w-full shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          {/* <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button> */}
          {/* Logo */}
          <div className="flex gap-20">
            <NavLink end to="/" className="flex col-span-10">
              <div className='text-white self-center font-bold text-2xl'>WatSom.ai</div>
            </NavLink>
            <UserMenu align="right" removeText={true} />
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            {/* <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
            </h3> */}
            <ul className="mt-3">
              {/*  */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('subscription') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('subscription') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <span className="text-lg font-medium ml-3">
                      ✨{t("try")} WatSom {t("pro")}
                      </span>
                    </div>
                    {/* Badge */}
                    {/* <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">4</span>
                    </div> */}
                  </div>
                </NavLink>
              </li>
              {/* dashboard */}
              <li className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('template') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/template"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('template') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-md font-medium ml-3">{t("template")}</span>
                  </div>
                </NavLink>
              </li>
              {/* Calendar */}
              {/* <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('calendar') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/calendar"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('calendar') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('calendar') && 'text-indigo-500'}`} d="M1 3h22v20H1z" />
                      <path
                        className={`fill-current text-slate-400 ${pathname.includes('calendar') && 'text-indigo-300'}`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Calendar
                    </span>
                  </div>
                </NavLink>
              </li> */}

            </ul>
          </div>
        </div>

        <TextInput
          id="searchProduct"
          type="search"
          sizing="md"
          placeholder={t("search_template")}
          required={true}
          icon={HiOutlineSearch}
          value={search}
          onChange={(e) => changeSearch(e)}
          onKeyDown={(e) => keyDownSearch(e)}
          className="w-full py-8"
        />

        <div className='text-white'>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<MdOutlineExpandMore />}
            defaultExpandIcon={<MdOutlineChevronRight />}
            defaultExpanded={['1']}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem nodeId="1" label={t("templates")}>
              <TreeItem nodeId="2" label={<div className={`${pathname.includes('long_article') && "bg-site_light-100"}`}>{t("long_article")}</div>} onClick={() => navigate('/template/long_article')} />
              <TreeItem nodeId="3" label={<div className={`${pathname.includes('content_improver') && "bg-site_light-100"}`}>{t("content_improver")}</div>} onClick={() => navigate('/template/content_improver')} />
            </TreeItem>
          </TreeView>
        </div>

        
        {/* Expand / collapse button */}
        {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;