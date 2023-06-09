import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import WordsUsage from '../WordsUsage';

import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import LogoTextDark from '../../images/logo-text-dark.png';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  const { authState } = useSelector((state) => state);
  const location = useLocation();
  const [sssidebarOpen, setSSSideBarOpen] = useState()

  const { pathname } = location;

  const { userInfo, loggedIn } = authState;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  const { t } = useTranslation();
  const plan_list = [t("free_trial"), t("essential"), t("pro_month"), t("pro_year")]

  useEffect(() => {
    setSSSideBarOpen(sidebarOpen);
    // debugger
  }, [sidebarOpen])

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      // if (!sidebar.current || !trigger.current) return;
      // if (!sssidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) 
      //   return;
      // debugger
      setSSSideBarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sssidebarOpen || keyCode !== 27) return;
      setSSSideBarOpen(false);
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

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sssidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      {/* <div
        id="sidebar"
        ref={sidebar}
        className={` bg-black  flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto  h-screen  no-scrollbar w-[350px] lg:w-full lg:sidebar-expanded:!w-full 2xl:!w-full shrink-0 p-4 transition-all duration-200 ease-in-out ${
          sssidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      > */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen lg:overflow-y-auto no-scrollbar w-64 lg:!w-full 2xl:!w-full shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sssidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >

        <div className="flex items-center mb-4 pr-3 sm:px-2">
            {/* Close button */}
            <button
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
          </button>
          
          <NavLink end to="/" className="block ml-5">
            <img className="object-center h-10" src={LogoTextDark} alt="Authentication" />
          </NavLink>
        </div>

        {/* Sidebar header */}
        {/* <div className="flex justify-between mb-10 pr-3 sm:px-2"> */}

          {/* Logo */}
          {/* <NavLink end to="/" className="flex gap-4"> */}
            {/* <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg> */}
            {/* <div className='text-white self-center'>
              {
                loggedIn == false 
                  ? <span className='text-orange-400'>{t("please_login")}</span>
                  : userInfo?.plan >= 0 && <span>{plan_list[userInfo.plan]}</span>
              }
            </div> */}
          {/* </NavLink> */}
        {/* </div> */}

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              {/* <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span> */}
              <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Seiten</span>
            </h3>
            <ul className="mt-3">
              {/*  */}
              {/* <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('subscription') && 'bg-slate-900'}`}> */}
                {/* <NavLink
                  end
                  to="/subscription"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('subscription') && 'hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      ✨{t("try")} WatSom {t("pro")}
                      </span>
                    </div> */}
                    {/* Badge */}
                    {/* <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">4</span>
                    </div> */}
                  {/* </div>
                </NavLink> */}
              {/* </li> */}
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
                  <svg class="shrink-0 h-6 w-6" stroke-width="1.5px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs></defs><title>layout-module-1</title><rect class="stroke-current text-slate-400 !text-indigo-500" x="0.75" y="0.747" width="9" height="9" rx="1.5" ry="1.5" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round"></rect><rect class="stroke-current text-slate-400 !text-indigo-500" x="0.75" y="14.247" width="9" height="9" rx="1.5" ry="1.5" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round"></rect><rect class="stroke-current text-slate-400 !text-indigo-500" x="14.25" y="0.747" width="9" height="9" rx="1.5" ry="1.5" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round"></rect><rect class="stroke-current text-slate-400 !text-indigo-500" x="14.25" y="14.247" width="9" height="9" rx="1.5" ry="1.5" fill="none" stroke="#6366F1" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-100 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t("templates")}</span>
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
        {
          userInfo?.plan < 2 &&
          <WordsUsage isMB={false} />
        }
      </div>
    </div>
  );
}

export default Sidebar;