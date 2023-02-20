import { Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ToneSelect from '../ToneSelect';
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import EditButtonGroup from '../EditButtonGroup';

import { setLoading } from '../../../redux/globalReducer';
import TextareaAutosize from 'react-textarea-autosize';

function AmazonProductTitle({
  func_SetTitle, func_SetKeywords, func_SetTone, result
}) {
  const { globalState } = useSelector((state) => state);
  const { loading } = globalState;
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [content_result, setContentResult] = useState(result)

  useEffect(() => {
    setContentResult(result)
  }, [result]);

  // title
  const changeTitle = (value) => {
    setTitle(value);
    func_SetTitle(value);
  }

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
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100" style={{height: " calc(100vh - 10rem) "}}>
      <div className="pb-8">
        <div style={{textAlign: "-webkit-center"}}>
          <div className='w-2/3 text-start'>
            <div className='grid grid-cols-12 py-4'>
              <div className='col-span-3'>
                {t("amazon_product_about")}
              </div>
              <div className='col-span-9'>
                <TextInput 
                  value={title}
                  onChange={(e) => changeTitle(e.target.value)}
                />
                <div className='underline text-gray-400'>
                  {t("minimum_10_character")}
                </div>
              </div>
            </div>

            <div className='grid grid-cols-12 py-4'>
              <div className='col-span-3'>
                {t("keywords")}
              </div>
              <div className='col-span-9'>
                <TextInput 
                  value={keywords}
                  onChange={(e) => changeKeywords(e.target.value)}
                />
                <div className='underline text-gray-400'>
                  {t("separate_keywords_with")} ","
                </div>
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

export default AmazonProductTitle;