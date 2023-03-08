import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch, useSelector } from 'react-redux'
import Validator from 'validator';
import { useTranslation } from "react-i18next";
import { login } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom'

import AuthImage from '../../images/auth-image.jpg';
import AuthDecoration from '../../images/auth-decoration.png';
import { Button } from 'flowbite-react';
import { setLoading } from '../../redux/globalReducer';

function Signin() {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn } = authState;

  useEffect(() => {
    if(loggedIn){
      navigate("/template")
    }
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (key, value) => {
    userData[`${key}`] = value;
    setUserData({ ...userData });
  };

  function validate() {
    const {email, password} = userData;

    if (!email) {
      dispatch(openSnackBar({ status: "warning", message: t("msg_fill_email") }))
      return false;
    } else if (!Validator.isEmail(email)) {
        dispatch(openSnackBar({ status: "warning", message: t("msg_invalid_email") }))
        return false;
    } else if (!password) {
      dispatch(openSnackBar({ status: "warning", message: t("msg_fill_password") }))
      return false;
    }
    return true;
  }

  const signin = async () => {
    var validate_result = validate();

    if(validate_result){
      dispatch(setLoading(true));
      let res = await dispatch(login(userData))
      if(res.status != false){
        dispatch(setLoading(false));
        dispatch(openSnackBar({ status: "success", message: t("login_success") }))
        navigate("/template")
      }else{
        dispatch(setLoading(false));
        dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
      }
      // console.log("success")
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
          Watsom  ✨  
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("sign_in_to_your_acc")}
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("email_address")}</label>
                <input type="email" name="email" id="email" value={userData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("password")}</label>
                <input type="password" name="password" id="password" value={userData.password} onChange={(e) => handleInputChange("password", e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                    {/* <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div> */}
                </div>
                <Link to="/reset-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">{t("forgot_password")}?</Link>
              </div>
              <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => signin()}>{t("sign_in")}</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("dont_have_acc")} <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">{t("sign_up")}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;