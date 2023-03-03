import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import { paraphrasingRewriteQuillbot } from '../../../redux/template/blog';

import ParaphrasingRewriteQuillbot from '../../../components/Generate/Blog/ParaphrasingRewriteQuillbot';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../../redux/globalReducer';

export default function ParaphrasingRewriteQuillbotPage() {
  const { blogState, globalState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { paraphrasingRewriteQuillbotState } = blogState;
  const { loading } = globalState;

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
        console.log("contents", contents)
        console.log("tone", tone)

        const sendData = {
          output:count,
          lang:lang,
          type:type,
          content:contents,
          tone:tone
        }

        let res = await dispatch(paraphrasingRewriteQuillbot(sendData));
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
    <>
      <div>
        <div className='grid grid-cols-12 h-full'>
          <div className='col-span-2'>
            <Sidebar/>
          </div>
          <div className='col-span-10'>
            <div className='grid grid-cols-5'>
              <div className='col-span-3 border-gray-300' style={{borderRightWidth: "1px"}}>
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
              <div className='col-span-2'>
                <DocEditor />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}