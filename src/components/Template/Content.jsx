import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import TemplateSearch from './TemplateSearch';
import TemplateCard from './TemplateCard';
import { templateData } from './TemplateData';

function Content({
}) {
  const { t } = useTranslation();

  const [template_group, setTemplateGroup] = useState(0);  
  const group_name = [t("group_all"), t("group_youtube"), t("group_blog"), t("group_amazon"), t("group_ads"), t("group_social_media")];


  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" style={{height: " calc(100vh - 5.5rem) "}}>
      <TemplateSearch setTemplateGroup = {setTemplateGroup} />

      <div style={{textAlign: "-webkit-center"}}>
        <div className="pt-8 mx-10">
          <div className='flex text-xl'>
            {t("templates")} - &nbsp;<div className='font-bold text-lg'>{group_name[template_group]}</div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8'>
            {
              templateData.map((data, index) => (template_group == 0 || data.group == template_group) &&
                <TemplateCard 
                  key={index}
                  title={t(data.title)}
                  content={t(data.content)}
                  link={data.link}
                  icon={data.icon}
                />
              )
            }
            {/* <TemplateCard 
              title={t("long_article_title")}
              content={t("long_article_content")}
              link="long_article"
              icon="blog"
            />
            <TemplateCard 
              title={t("content_improver")}
              content={t("content_improver_content")}
              link="content_improver"
              icon="blog"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;