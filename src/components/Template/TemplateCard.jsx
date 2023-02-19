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
      <Card className="text-start cursor-pointer h-full" onClick={()=>clickCard(link, icon)}>
        {
          icon == "all" ? 
          <HiOutlineSquares2X2 
            className="w-12 h-12"
          /> : icon == "youtube" ?
          <AiOutlineYoutube 
            className="w-12 h-12"
          /> : icon == "blog" ?
          <ImBlog 
            className="w-12 h-12"
          /> : icon == "amazon" ?
          <AiOutlineAmazon 
            className="w-12 h-12"
          /> : icon == "ads" ?
          <FcAdvertising 
            className="w-12 h-12"
          /> : icon == "social_media" &&
          <HiOutlineHashtag 
            className="w-12 h-12"
          />
        }
        <div className='px-2'>
          <h5 className="text-2xl pb-2 font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="font-bold text-xl text-gray-400">
            {content}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default TemplateCard;