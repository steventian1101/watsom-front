import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";

function Footer({
  
}) {
  const { t } = useTranslation();

  const [showCount, setShowCount] = useState(3);
  const output_count = [1,2,3,4,5];
  
  return (
    <div style={{textAlign:"-webkit-center", height:"5rem", borderTopWidth: "1px"}} className="pt-4 border-gray-300">
      <div className='w-11/12 flex justify-between items-center'>
        <div className="flex gap-4">
          <div className="text-xl p-2 font-bold tracking-tight text-gray-900">
            OutPut
          </div>

          <select className='rounded-lg w-24' defaultValue={showCount}>
            {
              output_count.map((data,index)=>
                <option value={data} key={index} onChange={()=>setShowCount(data)}>{data}</option>
              )
            }
          </select>
        </div>

        <div className="flex items-center">
          <div
              className="w-full font-medium p-1  text-sm inline-flex items-center justify-center border-2 border-transparent rounded-lg leading-5 shadow-sm transition duration-150 ease-in-out bg-site_light-100 hover:!bg-site_light-100 text-white cursor-pointer"
          >
            <div className="text-lg hidden md:block py-1 px-16">Generate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;