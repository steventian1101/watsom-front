import { Textarea } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import ToneSelect from '../ToneSelect';
import EditButtonGroup from '../EditButtonGroup';

import TextareaAutosize from 'react-textarea-autosize';

function ParaphrasingRewriteQuillbot({
  func_SetTone, func_SetContents, result
}) {
  const { t } = useTranslation();

  const [contents, setContents] = useState("")
  const [content_result, setContentResult] = useState(result)

  useEffect(() => {
    setContentResult(result)
  }, [result]);

  const changeContents = (value) => {
    setContents(value);
    func_SetContents(value);
  }

  // tone
  const selectTone = (value) => {
    func_SetTone(value)
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
          <div className='w-4/5 text-start py-2'>
            <div className='font-bold py-2'>
              {t("content_to_rewrite_as_quillbot")}
            </div>
            <Textarea 
              className='bg-white w-full'
              rows={5}
              value={contents}
              onChange={(e) => changeContents(e.target.value)}
            />
          </div>
          <div className='w-4/5 text-start py-2'>
            <div className='font-bold py-2'>
              {t("tone")}
            </div>
            <ToneSelect 
              selectTone = {selectTone}
            />
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

export default ParaphrasingRewriteQuillbot;