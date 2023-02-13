import { TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ToneSelect from '../ToneSelect';
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";

function LongArticle({
  func_SetTitle, func_SetKeywords, func_SetTone, func_SetFirstOutline, func_setOutline
}) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [outline, setOutline] = useState([])
  const [firstOutline, setFirstOutline] = useState("")
  const dispatch = useDispatch();

  // outline list begin
  const changeFirstOutline = (value) => {
    setFirstOutline(value)
    func_SetFirstOutline(value)
  }

  const removeFirstOutline = () => {
    setFirstOutline("")
    func_SetFirstOutline("")
  }

  const newOutline = () => {
    if(firstOutline){
      setOutline([...outline, firstOutline])
      func_setOutline([...outline, firstOutline])
      setFirstOutline("")
      func_SetFirstOutline("")
    }else{
      dispatch(openSnackBar({ message: t("msg_please_input_outline"), status: 'error' }));
    }
  }

  const regenerateAll = () => {
    setFirstOutline("")
    setOutline([])
    func_SetFirstOutline("")
    func_setOutline([])
  }

  const setExistOutline = (index, value) => {
    outline[index] = value;
    setOutline([...outline]);
    func_setOutline([...outline]);
  }

  const removeExist = (index) => {
    outline.splice(index, 1);
    setOutline([...outline]);
    func_setOutline([...outline]);
  }
  // outline list end

  // title
  const changeTitle = (value) => {
    setTitle(value);
    func_SetTitle(value);
  }

  // keywords
  const changeKeywords = (value) => {
    setKeywords(value);
    func_SetKeywords(value);
  }

  // tone
  const selectTone = (value) => {
    func_SetTone(value)
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100" style={{height: " calc(100vh - 10rem) "}}>
      <div>
        <div>
          <div className='text-center px-4 py-8'>
            <div className='text-2xl'>
              {t("long_blog_step1")}
            </div>
            <div className='italic'>
              {t("long_blog_step1_sub")}
            </div>
          </div>

          <div style={{textAlign: "-webkit-center"}}>
            <div className='w-2/3 text-start'>
              <div className='grid grid-cols-12 pb-4'>
                <div className='col-span-3'>
                  {t("blog_title_topic")}
                </div>
                <div className='col-span-9'>
                  <TextInput 
                    value={title}
                    onChange={(e) => changeTitle(e.target.value)}
                  />
                  <div className='underline text-gray-400'>
                    {t("minimum_10_character")}
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-12 pb-4'>
                <div className='col-span-3'>
                  {t("keywords")}
                </div>
                <div className='col-span-9'>
                  <TextInput 
                    value={keywords}
                    onChange={(e) => changeKeywords(e.target.value)}
                  />
                  <div className='underline text-gray-400'>
                    {t("separate_keywords_with")} ","
                  </div>
                </div>
              </div>
              
              <div className='grid grid-cols-12 pb-4'>
                <div className='col-span-3'>
                  {t("tone")}
                </div>
                <div className='col-span-9'>
                  <ToneSelect 
                    selectTone = {selectTone}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className='text-center pb-4'>
            <div className='text-2xl'>
              {t("long_blog_step2")}
            </div>
            <div className='italic'>
              {t("long_blog_step2_sub")}
            </div>
          </div>
          
          <div style={{textAlign: "-webkit-center"}}>
            {/* intro cosmetic */}
            <div className='w-2/3 text-start py-2'>
              <div className='border-dotted p-2 border-gray-400 border-2 text-gray-400'>
                {t("blog_intro_will_added")}
              </div>
            </div>

            {/* outline list */}
            {
              outline.length > 0 && outline.map((data,index) => 
                <div key={index} className='w-2/3 grid grid-cols-12 py-2'>
                  <div className='col-span-11'>
                    <TextInput
                      sizing="lg"
                      value={data}
                      onChange={(e) => setExistOutline(index, e.target.value)}
                    />
                  </div>
                  <div className='col-span-1 self-center'>
                    <AiOutlineCloseCircle 
                      className='w-8 h-8' 
                      onClick={()=>removeExist(index)}
                    />
                  </div>
                </div>
              )
            }

            {/* outline first */}
            <div className='w-2/3 grid grid-cols-12 py-2'>
              <div className='col-span-11'>
                <TextInput
                  sizing="lg"
                  value={firstOutline}
                  onChange={(e) => changeFirstOutline(e.target.value)}
                />
              </div>
              <div className='col-span-1 self-center'>
                <AiOutlineCloseCircle 
                  className='w-8 h-8' 
                  onClick={()=>removeFirstOutline()}
                />
              </div>
            </div>

            <div className='flex justify-between w-2/3 py-2'>
              <div 
                onClick={()=>newOutline()}
                className='underline text-site_light-100 self-center'
              >
                + {t("generate_more_outline")}
              </div>
              <div>
                <div className="flex items-center">
                  <div
                    onClick={()=>regenerateAll()}
                    className="w-full font-medium p-1  text-sm inline-flex items-center justify-center border-2 border-transparent rounded-lg leading-5 shadow-sm transition duration-150 ease-in-out bg-site_light-100 hover:!bg-site_light-100 text-white cursor-pointer"
                  >
                    <span className="hidden md:block py-1 px-2">{t("regenerate_all")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-2/3 text-start py-2'>
              <div className='border-dotted p-2 border-gray-400 border-2 text-gray-400'>
                {t("blog_intro_will_added")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LongArticle;