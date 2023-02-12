import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

function Header({
  title, content
}) {
  const { t } = useTranslation();

  return (
    <div style={{textAlign:"-webkit-center"}} className="pt-4 border-b-2 border-gray-400">
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