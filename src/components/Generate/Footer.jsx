import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { setOutputCurrentLanguage } from '../../redux/globalReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { openSnackBar } from '../../redux/snackBarReducer';
import { useNavigate } from 'react-router-dom'
import { getAvailable } from '../../redux/authReducer';

function Footer({
  type,
  data,
  generate,
  count_disable
}) {
  const { authState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userInfo, loggedIn } = authState;

  const [showCount, setShowCount] = useState(3);
  const [showLanguage, setShowLanguage] = useState("French");
  const output_count = [1,2,3,4,5];
  const output_language = ["French", "English", "Spanish"]
  
  function is_valid_date(){
    let now_date = Date.now();
    let plan_start = new Date(userInfo?.plan_start_date).getTime();
    let plan_finish = new Date(userInfo?.plan_finish_date).getTime();
  
    if(now_date <= plan_start){
      dispatch(openSnackBar({ status: "warning", message: t("please_set_exact_time") }))
      return false;
    } else if(now_date >= plan_finish){
      dispatch(openSnackBar({ status: "warning", message: t("finished_subscription_period") }))
      return false
    } else{
      return true
    }
  }

  async function is_available(){
    if(loggedIn == true && userInfo){   //login status
      if(userInfo?.is_verified){      //confirm mail
        if(!userInfo?.is_block){       //check blocked acc
          if(is_valid_date()){      //check in available period
            if(userInfo?.available_words_count <= 10){    //check usage words count
              dispatch(openSnackBar({ status: "warning", message: t("limit_usage_word") }))
              return false;
            } else if(userInfo?.available_words_count > 10){
              let res = await dispatch(getAvailable(userInfo))
              if(res.status == true){
                return true;
              }else{
                dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
                return false;
              }
            } 
          }
        } else{
          dispatch(openSnackBar({ status: "warning", message: t("your_acc_was_blocked") }))
          return false;
        }
      } else{
        dispatch(openSnackBar({ status: "warning", message: t("please_confirm_mail") }))
        return false;
      }
    }else{
      dispatch(openSnackBar({ status: "warning", message: t("please_sign_in") }))
      navigate("/signin")
      return false;
    }
  }

  const clickGenerate = async () => {
    if(is_available() == true){
      generate(data, showCount, type, showLanguage)
    }
  }

  const selectOutputLanguage = (lang) => {
    setShowLanguage(lang)
    dispatch(setOutputCurrentLanguage(lang))
  }

  return (
    <div style={{textAlign:"-webkit-center", height:"5rem", borderTopWidth: "1px"}} className="pt-4 border-gray-300">
      <div className='w-11/12 flex justify-between items-center'>
        <div className="flex gap-4">
          <div className="text-xl p-2 font-bold tracking-tight text-gray-900">
            {t("output")}
          </div>

          <select className='rounded-lg w-24 disabled:cursor-not-allowed' onChange={(e)=>setShowCount(e.target.value)} defaultValue={count_disable ? 1 : showCount} disabled = {count_disable} >
            {
              output_count.map((data,index)=>
                <option value={data} key={index}>{data}</option>
              )
            }
          </select>
        </div>

        <div className="flex gap-4">
          <div className="text-xl p-2 font-bold tracking-tight text-gray-900">
            {t("language")}
          </div>

          <select className='rounded-lg w-36 disabled:cursor-not-allowed' onChange={(e)=>selectOutputLanguage(e.target.value)} defaultValue={showLanguage}>
            {
              output_language.map((data,index)=>
                <option value={data} key={index}>{data}</option>
              )
            }
          </select>
        </div>

        <div className="flex items-center">
          <div
              className="w-full font-medium p-1  text-sm inline-flex items-center justify-center border-2 border-transparent rounded-lg leading-5 shadow-sm transition duration-150 ease-in-out bg-site_light-100 hover:!bg-blue-800 text-white cursor-pointer"
          >
            <div className="text-lg hidden md:block py-1 px-16" onClick={() => clickGenerate()}>{t("generate")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;