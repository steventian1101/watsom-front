import React, {useState} from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

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
      dispatch(openSnackBar({ message: "Please Input the Contents!", status: 'error' }));
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
                title="Content Improver"
                content="Take a piece of content and rewrite it to make it more interesting, creative, and engaging."
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
