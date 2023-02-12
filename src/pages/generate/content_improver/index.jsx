import React from 'react';
import Header from '../../../components/Generate/Header';
import Sidebar from '../../../components/Generate/Sidebar';
import DocEditor from '../../../components/Generate/DocEditor'
import Footer from '../../../components/Generate/Footer';

import ContentImprover from '../../../components/Generate/ContentImprover';
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
                title="Content Improver"
                content="Take a piece of content and rewrite it to make it more interesting, creative, and engaging."
              />
              <ContentImprover />
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
