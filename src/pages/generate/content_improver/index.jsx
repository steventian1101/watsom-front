import React from 'react';
import Header from '../../components/Template/Header';
import Sidebar from '../../components/Template/Sidebar';
import Content from '../../components/Template/Content';

import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
      <div>
        <Header />

        <div className='h-6 bg-site_light-100 text-white text-center text-sm font-bold w-full'>
          {t("future")} of WatSom 🎉
        </div>

        <div className='grid grid-cols-12'>
          <div className='col-span-2'>
            <Sidebar/>
          </div>
          <div className='col-span-10'>
            <Content />
          </div>
        </div>

      </div>
  );
}
