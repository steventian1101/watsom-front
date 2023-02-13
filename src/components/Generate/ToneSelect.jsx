import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function ToneSelect({
  selectTone
}) {
  const { t } = useTranslation();

  const [showTone, setShowTone] = useState(0);
  const output_tone = [t("tone_friendly"),t("tone_bold"),t("tone_professional"),t("tone_casual"),t("tone_luxury"),t("tone_witty"),t("tone_adventurous"),t("tone_persuasive"),t("tone_empathetic")];
  
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