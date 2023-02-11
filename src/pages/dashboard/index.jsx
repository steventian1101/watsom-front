import React from 'react';
import Header from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';

import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
      <div>
        <Header />

        <div className='h-6 bg-blue-700 text-white text-center text-sm font-bold w-full'>
          {t("future")} of WatSom 🎉
        </div>

        <div className='flex w-full h-full'>
          <div>
            <Sidebar/>
          </div>
        <div>

          </div>
        </div>

      </div>
  );
}
