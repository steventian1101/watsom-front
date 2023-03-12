import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor/updated'
import Footer from '../../../components/Generate/Footer';

import { paraphrasingRewriteQuillbot } from '../../../redux/template/blog';

import ParaphrasingRewriteQuillbot from '../../../components/Generate/Blog/ParaphrasingRewriteQuillbot';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../../redux/globalReducer';

import { updateToken } from '../../../redux/authReducer';

export default function ParaphrasingRewriteQuillbotPage() {
  const { blogState, globalState, authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { paraphrasingRewriteQuillbotState } = blogState;
  const { loading } = globalState;
  const { userToken } = authState;

  const [contents, setContents] = useState("")
  const [tone, setTone] = useState(0);
  const [result, setResult] = useState([]);

  const validate = (data) => {
    const {contents} = data

    if(!contents){
      dispatch(openSnackBar({ message: t("msg_please_input_contents"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = async (data, count, type, lang) => {
    if(!loading){
      let is_valid = validate(data);

      if(is_valid){
        dispatch(setLoading(true));

        const { contents, tone } = data;
        // console.log("contents", contents)
        // console.log("tone", tone)

        const sendData = {
          output:count,
          lang:lang,
          type:type,
          content:contents,
          tone:tone,
          token: userToken
        }

        let res = await dispatch(paraphrasingRewriteQuillbot(sendData));
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
    <>
      <div>
        <div className='grid grid-cols-12 h-full bg-gray-100'>
          <div className='col-span-2'>
            <Sidebar/>
          </div>
          <div className='col-span-10'>
            <div className='grid grid-cols-12'>
              <div className='col-span-5 border-gray-300 my-4 ml-8 bg-white' style={{borderWidth: "1px", borderRadius: '25px'}}>
                <Header 
                  title={t("paraphrasing_rewrite_quillbot")}
                  content={t("paraphrasing_rewrite_quillbot_content")}
                />
                <ParaphrasingRewriteQuillbot 
                  func_SetContents={setContents}
                  func_SetTone = {setTone}
                  result = {result}
                />
                <Footer 
                  type = "paraphrasing_rewrite_quillbot"
                  data = {{contents: contents, tone: tone}}
                  generate = {generate}
                  count_disable = {false}
                />
              </div>
              <div className='col-span-7'>
                <DocEditor />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
