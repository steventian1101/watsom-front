import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor/updated'
import Footer from '../../../components/Generate/Footer';

import GoogleBusinessPost from '../../../components/Generate/SocialMedia/GoogleBusinessPost';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateGoogleBusinessPost } from '../../../redux/template/social_media';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';

import { updateToken } from '../../../redux/authReducer';

export default function GoogleBusinessPostPage() {
  const { globalState, authState } = useSelector((state) => state);
  const { loading } = globalState;
  const { userToken } = authState;
  const { t } = useTranslation();

  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [post_type, setPostType] = useState(0);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const validate = (data) => {
    const {keywords} = data
    
    if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_short_description"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);
  
      if(is_valid){
        dispatch(setLoading(true));
        const { keywords, tone, post_type } = data;
        
        const sendData = {
          keywords:keywords,
          tone:tone,
          token: userToken,
          post_type:post_type,
          output:count,
          lang:lang,
        }
  
        let res = await dispatch(generateGoogleBusinessPost(sendData));
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
                title={t("google_business_post")}
                content={t("google_business_post_content")}
              />
              <GoogleBusinessPost 
                func_SetKeywords = {setKeywords}
                func_SetTone = {setTone}
                func_SetPostType = {setPostType}
                result = {result}
              />
              <Footer 
                type = "google_business_post"
                data = {{keywords: keywords, tone: tone, post_type: post_type}}
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
