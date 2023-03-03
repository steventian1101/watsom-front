import React, { useState } from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import InterviewQuestion from '../../../components/Generate/Blog/InterviewQuestion';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { generateInterviewQuestion } from '../../../redux/template/blog';
import { setLoading, setCurrentDocument } from '../../../redux/globalReducer';

export default function InterviewQuestionPage() {
  const { globalState } = useSelector((state) => state);
  const { loading } = globalState;
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const validate = (data) => {
    const {title, keywords} = data

    if(!title){
      dispatch(openSnackBar({ message: t("msg_please_input_interview_subject"), status: 'error' }));
      return false;
    }else if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_interview_description"), status: 'error' }));
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
          output:count,
          lang:lang,
        }
  
        let res = await dispatch(generateInterviewQuestion(sendData));
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
                title={t("interview_question")}
                content={t("interview_question_content")}
              />
              <InterviewQuestion 
                func_SetTitle = {setTitle}
                func_SetKeywords = {setKeywords}
                func_SetTone = {setTone}
                result = {result}
              />
              <Footer 
                type = "interview_question"
                data = {{title: title, keywords: keywords, tone: tone}}
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
