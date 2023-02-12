import React from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import LongArticle from '../../../components/Generate/LongArticle';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div>

      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-2'>
          <Sidebar/>
        </div>
        <div className='col-span-10'>
          <div className='grid grid-cols-5'>
            <div className='col-span-3 border-gray-300' style={{borderRightWidth: "1px"}}>
              <Header 
                title="Complete long from article"
                content="Get a summarized version from a piece of content."
              />
              <LongArticle />
              <Footer />
            </div>
            <div className='col-span-2'>
              <DocEditor />
            </div>
          </div>

        </div>
      </div>

  </div>
  );
}
