import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import TemplateSearch from './TemplateSearch';
import TemplateCard from './TemplateCard';

function Content({
}) {
  const { t } = useTranslation();

  const [template_group, setTemplateGroup] = useState(0);  
  const group_name = [t("group_all"), t("group_social_media"), t("group_blog"), t("group_website_copy"), t("group_email"), t("group_ads")];


  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" style={{height: " calc(100vh - 5.5rem) "}}>
      <TemplateSearch setTemplateGroup = {setTemplateGroup} />

      <div style={{textAlign: "-webkit-center"}}>
        <div className="pt-8 w-4/5">
          <div className='flex text-2xl'>
            {t("templates")} - &nbsp;<div className='font-bold'>{group_name[template_group]}</div>
          </div>

          <div className='grid grid-cols-3 gap-8 pt-8'>
            <TemplateCard 
              title={t("long_article_title")}
              content={t("long_article_content")}
              link="long_article"
              icon="all"
            />
            <TemplateCard 
              title={t("content_improver")}
              content={t("content_improver_intro")}
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