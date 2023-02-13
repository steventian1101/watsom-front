import { Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import ToneSelect from '../ToneSelect';

function ContentImprover({
  func_SetTone, func_SetContents
}) {
  const { t } = useTranslation();

  const [contents, setContents] = useState("")

  const changeContents = (value) => {
    setContents(value);
    func_SetContents(value);
  }

  // tone
  const selectTone = (value) => {
    func_SetTone(value)
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100" style={{height: " calc(100vh - 10rem) "}}>
      <div style={{textAlign: "-webkit-center"}}>
        <div className='w-2/3 text-start py-2'>
          <div className='font-bold py-2'>
            Content to Improve
          </div>
          <Textarea 
            className='bg-white w-full'
            rows={5}
            value={contents}
            onChange={(e) => changeContents(e.target.value)}
          />
        </div>
        <div className='w-2/3 text-start py-2'>
          <div className='font-bold py-2'>
            Tone
          </div>
          <ToneSelect 
            selectTone = {selectTone}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentImprover;