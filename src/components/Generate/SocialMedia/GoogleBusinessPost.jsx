import { Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ToneSelect from '../ToneSelect';
import PostTypeSelect from '../PostTypeSelect';
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import EditButtonGroup from '../EditButtonGroup';

import { setLoading } from '../../../redux/globalReducer';
import TextareaAutosize from 'react-textarea-autosize';

function GoogleBusinessPost({
  func_SetKeywords, func_SetTone, func_SetPostType, result
}) {
  const { globalState } = useSelector((state) => state);
  const { loading } = globalState;
  const { t } = useTranslation();

  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [post_type, setPostType] = useState(0);
  const [content_result, setContentResult] = useState(result)

  useEffect(() => {
    setContentResult(result)
  }, [result]);

  // keywords
  const changeKeywords = (value) => {
    setKeywords(value);
    func_SetKeywords(value);
  }

  // tone
  const selectTone = (value) => {
    func_SetTone(value)
    setTone(value)
  }

  // post_type
  const selectPostType = (value) => {
    func_SetPostType(value)
    setPostType(value)
  }

  const changeResult = (index, value) => {
    let temp = [...content_result];
    temp[index] = value;
    setContentResult([...temp])
    // const textRowCount = textArea ? textArea.value.split("\n").length : 0
  }

  const removeContent = (index) => {
    let temp = [...content_result];
    temp.splice(index,1)
    setContentResult([...temp])
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100" style={{height: " calc(100vh - 12rem) "}}>
      <div className="pb-8">
        <div style={{textAlign: "-webkit-center"}}>
          <div className='w-4/5 text-start'>
            <div className='grid grid-cols-12 py-4'>
              <div className='col-span-3'>
                {t("post_type")}
              </div>
              <div className='col-span-9'>
                <PostTypeSelect 
                    selectPostType = {selectPostType}
                />
              </div>
            </div>

            <div className='grid grid-cols-12 py-4'>
              <div className='col-span-3'>
                {t("short_description")}
              </div>
              <div className='col-span-9'>
                <TextInput 
                  value={keywords}
                  onChange={(e) => changeKeywords(e.target.value)}
                />
              </div>
            </div>
            
            <div className='grid grid-cols-12 py-4'>
              <div className='col-span-3'>
                {t("tone")}
              </div>
              <div className='col-span-9'>
                <ToneSelect 
                  selectTone = {selectTone}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white' style={{textAlign: "-webkit-center"}}>
      {
        content_result && content_result.length > 0 && content_result.map((data, index)=>
          <div className='w-4/5 py-4' key={index}>
            <TextareaAutosize 
              className='bg-white w-full outline-none border-none focus:bg-gray-100 overflow-hidden'
              value={data}
              onChange={(e) => changeResult(index, e.target.value)}
            />
            <EditButtonGroup 
              content={data}
              index={index}
              removeContent={removeContent}
            />
            {/* <Textarea 
              rows={data.split("\n").length+1}
              value={data}
            /> */}
          </div>
        )
      }
      </div>
    </div>
  );
}

export default GoogleBusinessPost;