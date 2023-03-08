import React, { lazy, useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import LongArticle from '../../../components/Generate/Blog/LongArticle';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateLongArticle } from '../../../redux/template/blog';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';

import { updateToken } from '../../../redux/authReducer';

export default function LongArticlePage() {
  const { blogState, globalState, authState } = useSelector((state) => state);
  const { generateLongArticleState } = blogState;
  const { loading } = globalState;
  const { userToken } = authState;
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [firstOutline, setFirstOutline] = useState("");
  const [outline, setOutline] = useState("");

  const dispatch = useDispatch();

  const validate = (data) => {
    const {title, keywords, outline} = data

    if(!title){
      dispatch(openSnackBar({ message: t("msg_please_input_title"), status: 'error' }));
      return false;
    }else if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_keywords"), status: 'error' }));
      return false;
    }
    // else{
    //   if(outline){
    //     if(outline.length > 0){
    //       let cnt_outline = 0
    //       outline.map(data=>{
    //         if(data)
    //           cnt_outline ++
    //       })

    //       if(cnt_outline == 0){
    //         dispatch(openSnackBar({ message: t("msg_please_input_outline"), status: 'error' }));
    //         return false;    
    //       }
    //     }else{
    //       dispatch(openSnackBar({ message: t("msg_please_input_outline"), status: 'error' }));
    //       return false;  
    //     }
    //   }else{
    //     dispatch(openSnackBar({ message: t("msg_please_input_outline"), status: 'error' }));
    //     return false;
    //   }
    // }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);
  
      if(is_valid){
        dispatch(setLoading(true));
        const { title, keywords, outline, tone } = data;
        
        const sendData = {
          title:title,
          keywords:keywords,
          tone:tone,
          token: userToken,
          outline:outline,
          count:count,
          lang:lang,
          type:type
        }
  
        let res = await dispatch(generateLongArticle(sendData));
        if(res != false){
          dispatch(setLoading(false));
          console.log("res", res);
          // setResult(res.result)
          const {intro, conclusion, outline_content} = res
          let content = "# " + title + "\n"
          content += "## Introduction\n"
          content += intro + "\n";

          if(outline.length > 0){
            if(outline_content.length > 0){
              outline_content.map((data, index)=>{
                content += "## " + outline[index] + "\n"
                content += data + "\n"
              })
            }
          }

          content += "## Conclusion\n"
          content += conclusion;

          dispatch(setCurrentDocument(content))
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
                title={t("long_article_title")}
                content={t("long_article_content")}
              />
              <LongArticle 
                func_SetTitle = {setTitle}
                func_SetKeywords = {setKeywords}
                func_SetTone = {setTone}
                func_SetFirstOutline = {setFirstOutline}
                func_setOutline = {setOutline}
              />
              <Footer 
                type = "long_article"
                data = {{title: title, keywords: keywords, tone: tone, outline: [...outline, firstOutline]}}
                generate = {generate}
                count_disable = {true}
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
