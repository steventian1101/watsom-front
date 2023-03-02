import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function PostTypeSelect({
  selectPostType
}) {
  const { t } = useTranslation();

  const [showPostType, setShowPostType] = useState(0);
  const output_post_type = [t("post_event"), t("post_offer"),t("post_update")];
  
  const changeSelect = (index) => {
    setShowPostType(index);
    selectPostType(index);
  }

  return (
    <div>
      <select className='rounded-lg w-full' onChange={(e)=>changeSelect(e.target.value)} defaultValue={showPostType}>
        {
          output_post_type.map((data,index)=>
            <option value={index} key={index} >{data}</option>
          )
        }
      </select>
    </div>
  );
}

export default PostTypeSelect;