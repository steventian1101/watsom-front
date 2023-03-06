import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { setPassword } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';

import AuthImage from '../../images/auth-image.jpg';
import AuthDecoration from '../../images/auth-decoration.png';
import { Button } from 'flowbite-react';

function Signup() {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn } = authState;

  const routeParams = useParams();

  useEffect(() => {
    if(loggedIn){
      navigate("/template")
    }
  });

  useEffect(() => {
    if(routeParams.confirm_token){
      try{
        let info = jwt_decode(routeParams.confirm_token);
        setUserData({...userData, email: info._doc.email})
      }catch(error){
        console.log(error)
        dispatch(openSnackBar({ status: "error", message: t("invalid_token") }))
        navigate("/template")
      }
    }else{
      dispatch(openSnackBar({ status: "warning", message: t("msg_invalid_url") }))
    }
  },[]);

  const [userData, setUserData] = useState({
    email: "",
    password1: "",
    password2: ""
  })

  const handleInputChange = (key, value) => {
    userData[`${key}`] = value;
    setUserData({ ...userData });
  };

  function validate() {
    const {password1, password2} = userData;
    
    if (!password1) {
      dispatch(openSnackBar({ status: "warning", message: t("msg_fill_password") }))
      return false;
    }  else if (!password2) {
      dispatch(openSnackBar({ status: "warning", message: t("msg_fill_confirm_password") }))
      return false;
    } else if(password1 !== password2){
      dispatch(openSnackBar({ status: "warning", message: t("msg_match_password") }))
      return false;
    }
    return true;
  }

  const set_pass = async () => {
    var validate_result = validate();

    if(validate_result){
      let res = await dispatch(setPassword(userData))
      if(res.status != false){
        dispatch(openSnackBar({ status: "success", message: t("register_success") }))
        navigate("/signin")
      }else{
        dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
      }
    }
  }

  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
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
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">{t("set_new_password")} ✨</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">{t("password")}</label>
                    <input id="password" className="form-input w-full" type="password" autoComplete="on" value={userData.password1} onChange={(e) => handleInputChange("password1", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password2">{t("confirm_password")}</label>
                    <input id="password2" className="form-input w-full" type="password" autoComplete="on" value={userData.password2} onChange={(e) => handleInputChange("password2", e.target.value)} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    {/* <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">Email me about product news.</span>
                    </label> */}
                  </div>
                  <Button className="bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" onClick={() => set_pass()}>{t("set_new_password")}</Button>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}

export default Signup;