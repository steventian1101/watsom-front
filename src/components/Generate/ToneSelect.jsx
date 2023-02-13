import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function ToneSelect({
  selectTone
}) {
  const { t } = useTranslation();

  const [showTone, setShowTone] = useState(0);
  const output_tone = ["Friendly","Bold","Professional","Casual","Luxury","Witty","Adventurous","Persuasive","Empathetic"];
  
  const changeSelect = (index) => {
    setShowTone(index);
    selectTone(index);
  }

  return (
    <div>
      <select className='rounded-lg w-full' onChange={(e)=>changeSelect(e.target.value)} defaultValue={showTone}>
        {
          output_tone.map((data,index)=>
            <option value={index} key={index} >{data}</option>
          )
        }
      </select>
    </div>
  );
}

export default ToneSelect;