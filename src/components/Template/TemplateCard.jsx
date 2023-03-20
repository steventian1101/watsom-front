import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card} from 'flowbite-react';
import TemplateSearch from './TemplateSearch';
import { useNavigate } from 'react-router-dom'

import { HiOutlineSearch, HiOutlineHashtag, HiOutlineMail } from "react-icons/hi";
import { HiOutlineSquares2X2, HiOutlineComputerDesktop } from "react-icons/hi2";
import { ImBlog } from "react-icons/im"
import { FcAdvertising } from "react-icons/fc"
import { AiOutlineAmazon, AiOutlineYoutube } from "react-icons/ai"

import { setExpandGroup } from '../../redux/globalReducer';
import { useDispatch } from "react-redux";
// icon : all, blog, ads, youtube, amazon

function TemplateCard({title, content, link, icon}) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickCard = (link, icon) => {
    dispatch(setExpandGroup(icon))
    navigate(`/template/${link}`)
  }

  return (
    <div className="col-span-1" style={{minHeight: "50px"}}>
      <div className="rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5 text-start cursor-pointer h-full" onClick={()=>clickCard(link, icon)}>
        {
          icon == "all" ? 
          <HiOutlineSquares2X2 
            className="w-6 lg:w-10 h-6 lg:h-10"
          /> : icon == "youtube" ?
          <AiOutlineYoutube 
            className="w-6 lg:w-10 h-6 lg:h-10"
          /> : icon == "blog" ?
          <ImBlog 
            className="w-6 lg:w-10 h-6 lg:h-10"
          /> : icon == "amazon" ?
          <AiOutlineAmazon 
            className="w-6 lg:w-10 h-6 lg:h-10"
          /> : icon == "ads" ?
          <FcAdvertising 
            className="w-6 lg:w-10 h-6 lg:h-10"
          /> : icon == "social_media" &&
          <HiOutlineHashtag 
            className="w-6 lg:w-10 h-6 lg:h-10"
          />
        }
        <div className='px-2 mt-2'>
          <h5 className="pb-2 font-bold tracking-tight text-gray-900 text-lg">
            {title}
          </h5>
          <p className="font-bold text-gray-400 text-sm">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;