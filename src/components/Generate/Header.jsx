import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

function Header({
  title, content
}) {
  const { t } = useTranslation();

  return (
    <div style={{textAlign:"-webkit-center", height:"5rem", borderBottomWidth: "1px"}} className="pt-4 border-gray-300">
      <div className='w-11/12 text-start'>
        <h5 className="text-xl pb-2 font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="font-bold text-md text-gray-400">
          {content}
        </p>
      </div>
    </div>
  );
}

export default Header;