import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';
import Loading from '../../../components/Loading';

import { contentImprover } from '../../../redux/template/content';

import ContentImprover from '../../../components/Generate/ContentImprover';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { contentState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { contentImproverState } = contentState;

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

  const generate = async (data, count, type) => {
    if(!contentImproverState){
      let is_valid = validate(data);

      if(is_valid){
        const { contents, tone } = data;
        console.log("contents", contents)
        console.log("tone", tone)

        const sendData = {
          output:count,
          type:type,
          content:contents,
          tone:tone
        }

        let res = await dispatch(contentImprover(sendData));
        if(res != false){
          console.log("res", res);
          setResult(res.result)
        }else{
          dispatch(openSnackBar({ message: "Server Connection Error", status: 'error' }));
        }
      }
    }
  }

  return (
    <>
      {
        contentImproverState && <Loading />
      }
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
                  content={t("content_improver_intro")}
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
                <Footer />
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
