import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import TemplateSearch from './TemplateSearch';
import TemplateCard from './TemplateCard';

function Content({
}) {
  const { t } = useTranslation();

  const [template_group, setTemplateGroup] = useState(0);  
  const group_name = ["All", "Social Media", "Blog", "Website copy", "Email", "Ads"];


  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" style={{height: " calc(100vh - 5.5rem) "}}>
      <TemplateSearch setTemplateGroup = {setTemplateGroup} />

      <div style={{textAlign: "-webkit-center"}}>
        <div className="pt-8 w-4/5">
          <div className='flex text-2xl'>
            Templates - &nbsp;<div className='font-bold'>{group_name[template_group]}</div>
          </div>

          <div className='grid grid-cols-3 gap-8 pt-8'>
            <TemplateCard 
              title="Complete long from article"
              content="Get a summarized version from a piece of content."
              link="long_article"
              icon="all"
            />
            <TemplateCard 
              title="Content Improver"
              content="Take a piece of content and rewrite it to make it more interesting, creative, and engaging."
              link="content_improver"
              icon="all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;