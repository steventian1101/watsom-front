import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card, TextInput } from 'flowbite-react';
import { HiOutlineSearch, HiOutlineHashtag, HiOutlineMail } from "react-icons/hi";
import { HiOutlineSquares2X2, HiOutlineComputerDesktop } from "react-icons/hi2";
import { ImBlog } from "react-icons/im"
import { FcAdvertising } from "react-icons/fc"

function TemplateSearch({
}) {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");   //search bar text 
  const [icon_active, setIconActive] = useState(0);   //search bar text 

  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  const keyDownSearch = (e) => {
    if (e.keyCode === 13) {
      if (search.trim()) {
        
      }
    }
  }

  return (
    <div style={{textAlign: "-webkit-center"}} className="pt-8">
      <Card className="w-4/5 text-center bg-sky-100 cursor-default">
        <h4 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          What template are you looking for?
        </h4>

        <TextInput
          id="searchProduct"
          type="search"
          sizing="lg"
          placeholder="Search the template you are looking for"
          required={true}
          icon={HiOutlineSearch}
          value={search}
          onChange={(e) => changeSearch(e)}
          onKeyDown={(e) => keyDownSearch(e)}
          className="w-1/2 self-center"
        />
        
        <div className='grid grid-cols-6 self-center gap-2'>
          <div style={{textAlign: "-webkit-center"}} className="cursor-pointer col-span-1">
            <HiOutlineSquares2X2 
              className={`w-12 h-12 p-2 rounded-full ${icon_active == 0 ? "bg-blue-700 text-white" : "bg-white"}`}
              onClick={()=>setIconActive(0)}
            />
            <div className='pt-2 font-bold'>All</div>
          </div>
          <div style={{textAlign: "-webkit-center"}} className="cursor-pointer col-span-1">
            <HiOutlineHashtag 
              className={`w-12 h-12 p-2 rounded-full ${icon_active == 1 ? "bg-blue-700 text-white" : "bg-white"}`}
              onClick={()=>setIconActive(1)}
            />
            <div className='pt-2 font-bold'>Social Media</div>
          </div>
          <div style={{textAlign: "-webkit-center"}} className="cursor-pointer col-span-1">
            <ImBlog 
              className={`w-12 h-12 p-2 rounded-full ${icon_active == 2 ? "bg-blue-700 text-white" : "bg-white"}`}
              onClick={()=>setIconActive(2)}
            />
            <div className='pt-2 font-bold'>Blog</div>
          </div>
          <div style={{textAlign: "-webkit-center"}} className="cursor-pointer col-span-1">
            <HiOutlineComputerDesktop 
              className={`w-12 h-12 p-2 rounded-full ${icon_active == 3 ? "bg-blue-700 text-white" : "bg-white"}`}
              onClick={()=>setIconActive(3)}
            />
            <div className='pt-2 font-bold'>Website copy</div>
          </div>
          <div style={{textAlign: "-webkit-center"}} className="cursor-pointer col-span-1">
            <HiOutlineMail 
              className={`w-12 h-12 p-2 rounded-full ${icon_active == 4 ? "bg-blue-700 text-white" : "bg-white"}`}
              onClick={()=>setIconActive(4)}
            />
            <div className='pt-2 font-bold'>Email</div>
          </div>
          <div style={{textAlign: "-webkit-center"}} className="cursor-pointer col-span-1">
            <FcAdvertising 
              className={`w-12 h-12 p-2 rounded-full ${icon_active == 5 ? "bg-blue-700 text-white" : "bg-white"}`}
              onClick={()=>setIconActive(5)}
            />
            <div className='pt-2 font-bold'>Ads</div>
          </div>
        </div>
      </Card>                     
    </div>
  );
}

export default TemplateSearch;