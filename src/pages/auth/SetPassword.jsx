import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { setPassword } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';

import { setLoading } from '../../redux/globalReducer';

function SetPassword() {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn } = authState;

  const routeParams = useParams();

  // console.log("set password : ", routeParams)

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
        // console.log(error)
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
      dispatch(setLoading(true));
      let res = await dispatch(setPassword(userData))
      if(res.status != false){
        dispatch(setLoading(false));
        dispatch(openSnackBar({ status: "success", message: t("register_success") }))
        navigate("/signin")
      }else{
        dispatch(setLoading(false));
        dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
      }
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
            {t("set_new_password")}
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("password")}</label>
                <input type="password" name="password" id="password" placeholder="••••••••" value={userData.password1} onChange={(e) => handleInputChange("password1", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("confirm_password")}</label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" value={userData.password2} onChange={(e) => handleInputChange("password2", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              
              <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => set_pass()}>{t("set_new_password")}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SetPassword;