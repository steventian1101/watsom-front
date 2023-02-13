import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import { contentImprover } from '../../../redux/template/content';

import ContentImprover from '../../../components/Generate/ContentImprover';
import { useTranslation } from "react-i18next";
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch } from "react-redux";

export default function Index() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [contents, setContents] = useState("")
  const [tone, setTone] = useState(0);

  const validate = (data) => {
    const {contents} = data

    if(!contents){
      dispatch(openSnackBar({ message: t("msg_please_input_contents"), status: 'error' }));
      return false;
    }
    return true;
  }

  const generate = (data, count, type) => {
    let is_valid = validate(data);

    if(is_valid){
      const { contents, tone } = data;
      console.log("contents", contents)
      console.log("tone", tone)

      const sendData = {
        action:"create",
        output:count,
        templateId:"content-improver",
        values:{
          textarea1:contents,
          tone:"Friendly"
        }	
      }

      let res = dispatch(contentImprover(sendData));
      console.log("res", res);
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
                title={t("content_improver")}
                content={t("content_improver_intro")}
              />
              <ContentImprover 
                func_SetContents={setContents}
                func_SetTone = {setTone}
              />
              <Footer 
                type = "content_improver"
                data = {{contents: contents, tone: tone}}
                generate = {generate}
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
  );
}
