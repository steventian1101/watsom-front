import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import LongArticle from '../../../components/Generate/LongArticle';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch } from "react-redux";

export default function Index() {
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
      dispatch(openSnackBar({ message: "Please Input the Title!", status: 'error' }));
      return false;
    }else if(!keywords){
      dispatch(openSnackBar({ message: "Please Input the Keywords!", status: 'error' }));
      return false;
    }else{
      if(outline){
        if(outline.length > 0){
          let cnt_outline = 0
          outline.map(data=>{
            if(data)
              cnt_outline ++
          })

          if(cnt_outline == 0){
            dispatch(openSnackBar({ message: "Please Input the Outline!", status: 'error' }));
            return false;    
          }
        }else{
          dispatch(openSnackBar({ message: "Please Input the Outline!", status: 'error' }));
          return false;  
        }
      }else{
        dispatch(openSnackBar({ message: "Please Input the Outline!", status: 'error' }));
        return false;
      }
    }
    return true;
  }

  const generate = (data, count, type) => {
    let is_valid = validate(data);

    if(is_valid){
      const { title, keywords, outline, tone } = data;
      const formData = new FormData();
      
      let customized_outline = []
      outline.map(data=>{
        if(data){
          customized_outline = [...customized_outline, data]
        }
      })

      formData.append("title", title);
      formData.append("keywords", keywords);
      formData.append("tone", tone);
      formData.append("outline", JSON.stringify(customized_outline));
      formData.append("count", count);
      formData.append("type", type);

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
                title="Complete long from article"
                content="Get a summarized version from a piece of content."
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
