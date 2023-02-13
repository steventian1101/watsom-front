import { Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import ToneSelect from '../ToneSelect';

function ContentImprover({
}) {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100" style={{height: " calc(100vh - 10rem) "}}>
      <div style={{textAlign: "-webkit-center"}}>
        <div className='w-2/3 text-start py-2'>
          <div className='font-bold py-2'>
            Content to Improve
          </div>
          <Textarea 
            className='bg-white w-full'
            multiline={true}
            rows={5}
          />
        </div>
        <div className='w-2/3 text-start py-2'>
          <div className='font-bold py-2'>
            Tone
          </div>
          <ToneSelect />
        </div>
      </div>
    </div>
  );
}

export default ContentImprover;