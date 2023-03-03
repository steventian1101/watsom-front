import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import GoogleBusinessPost from '../../../components/Generate/SocialMedia/GoogleBusinessPost';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateGoogleBusinessPost } from '../../../redux/template/social_media';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';

export default function GoogleBusinessPostPage() {
  const { globalState } = useSelector((state) => state);
  const { loading } = globalState;
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
          post_type:post_type,
          output:count,
          lang:lang,
        }
  
        let res = await dispatch(generateGoogleBusinessPost(sendData));
        if(res != false){
          dispatch(setLoading(false));
          console.log("res", res);
          setResult(res.result)
        }else{
          dispatch(setLoading(false));
          dispatch(openSnackBar({ message: "Server Connection Error", status: 'error' }));
        }
      }
    }
  }

  return (
    <div>
      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-2'>
          <Sidebar/>
        </div>
        <div className='col-span-10'>
          <div className='grid grid-cols-5'>
            <div className='col-span-3 border-gray-300' style={{borderRightWidth: "1px"}}>
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
            <div className='col-span-2'>
              <DocEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
