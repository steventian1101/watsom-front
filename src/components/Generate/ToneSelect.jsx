import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function ToneSelect({
  
}) {
  const { t } = useTranslation();

  const [showTone, setShowTone] = useState(0);
  const output_tone = ["Select Tone","Friendly","Bold","Professional","Casual","Luxury","Witty","Adventurous","Persuasive","Empathetic"];
  
  return (
    <div>
      <select className='rounded-lg w-full' defaultValue={showTone}>
        {
          output_tone.map((data,index)=>
            <option value={index} key={index} onChange={()=>setShowTone(index)}>{data}</option>
          )
        }
      </select>
    </div>
  );
}

export default ToneSelect;