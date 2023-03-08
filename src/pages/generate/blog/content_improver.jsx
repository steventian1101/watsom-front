import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import { contentImprover } from '../../../redux/template/blog';

import ContentImprover from '../../../components/Generate/Blog/ContentImprover';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../../redux/globalReducer';
import { updateToken } from '../../../redux/authReducer';

export default function ContentImproverPage() {
  const { blogState, globalState, authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { contentImproverState } = blogState;
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
          token: userToken,
        }

        let res = await dispatch(contentImprover(sendData));
        if(res != false){
          dispatch(setLoading(false));
          // console.log("res", res);
          if(res.result == false){
            dispatch(openSnackBar({ message: t(res.message) , status: 'error' }));  
          }else{
            setResult(res.result)
            dispatch(updateToken(res.token))
            // console.log(res.token)
          }
        }else{
          dispatch(setLoading(false));
          dispatch(openSnackBar({ message: t("server_connection_error") , status: 'error' }));
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
                  title={t("content_improver")}
                  content={t("content_improver_content")}
                />
                <ContentImprover 
                  func_SetContents={setContents}
                  func_SetTone = {setTone}
                  result = {result}
                />
                <Footer 
                  type = "content_improver"
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
