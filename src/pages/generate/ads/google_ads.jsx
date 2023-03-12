import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor/updated'
import Footer from '../../../components/Generate/Footer';

import GoogleAds from '../../../components/Generate/Ads/GoogleAds';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateGoogleAds } from '../../../redux/template/ads';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';

import { updateToken } from '../../../redux/authReducer';

export default function GoogleAdsPage() {
  const { globalState, authState } = useSelector((state) => state);
  const { loading } = globalState;
  const { userToken } = authState;
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const validate = (data) => {
    const {title, keywords} = data

    if(!title){
      dispatch(openSnackBar({ message: t("msg_please_input_short_description"), status: 'error' }));
      return false;
    }else if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_keywords"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);
  
      if(is_valid){
        dispatch(setLoading(true));
        const { title, keywords, tone } = data;
        
        const sendData = {
          title:title,
          keywords:keywords,
          tone:tone,
          token: userToken,
          output:count,
          lang:lang,
        }
  
        let res = await dispatch(generateGoogleAds(sendData));
        if(res != false){
          dispatch(setLoading(false));
          if(res.result == false){
            dispatch(openSnackBar({ message: t(res.message) , status: 'error' }));  
          }else{
            setResult(res.result)
            dispatch(updateToken(res.token))
            // console.log(res.token)
          }
        }else{
          dispatch(setLoading(false));
          dispatch(openSnackBar({ message: t("server_connection_error"), status: 'error' }));
        }
      }
    }
  }

  return (
    <div>
      <div className='grid grid-cols-12 h-full bg-gray-100'>
        <div className='col-span-2'>
          <Sidebar/>
        </div>
        <div className='col-span-10'>
          <div className='grid grid-cols-12'>
            <div className='col-span-5 border-gray-300 my-4 ml-8 bg-white' style={{borderWidth: "1px", borderRadius: '25px'}}>
              <Header 
                title={t("google_ads")}
                content={t("google_ads_content")}
              />
              <GoogleAds 
                func_SetTitle = {setTitle}
                func_SetKeywords = {setKeywords}
                func_SetTone = {setTone}
                result = {result}
              />
              <Footer 
                type = "google_ads"
                data = {{title: title, keywords: keywords, tone: tone}}
                generate = {generate}
              />
            </div>
            <div className='col-span-7'>
              <DocEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
