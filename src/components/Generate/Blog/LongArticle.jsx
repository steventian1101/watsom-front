import { Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ToneSelect from '../ToneSelect';
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import { generateOutline, generateOneOutline } from '../../../redux/template/blog';
import { getAvailable } from '../../../redux/authReducer';
import { setLoading } from '../../../redux/globalReducer';
import { updateToken } from '../../../redux/authReducer';

function LongArticle({
  func_SetTitle, func_SetKeywords, func_SetTone, func_SetFirstOutline, func_setOutline
}) {
  const { blogState, globalState, authState } = useSelector((state) => state);
  const { generateOutlineState, generateOneOutlineState } = blogState;
  const { loading, output_language } = globalState;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userInfo, loggedIn, userToken } = authState;

  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState(0);
  const [outline, setOutline] = useState([])
  const [firstOutline, setFirstOutline] = useState("")
  const [showStep2, setShowStep2] = useState(false)
  const dispatch = useDispatch();

  function is_valid_date(){
    let now_date = Date.now();
    let plan_start = new Date(userInfo?.plan_start_date).getTime();
    let plan_finish = new Date(userInfo?.plan_finish_date).getTime();
  
    if(now_date <= plan_start){
      dispatch(openSnackBar({ status: "warning", message: t("please_set_exact_time") }))
      return false;
    } else if(now_date >= plan_finish){
      dispatch(openSnackBar({ status: "warning", message: t("finished_subscription_period") }))
      return false
    } else{
      return true
    }
  }

  async function is_available(){
    if(loggedIn == true && userInfo){   //login status
      if(userInfo?.is_verified){      //confirm mail
        if(!userInfo?.is_block){       //check blocked acc
          if(is_valid_date()){      //check in available period
            if(userInfo?.available_words_count <= 10){    //check usage words count
              dispatch(openSnackBar({ status: "warning", message: t("limit_usage_word") }))
              return false;
            } else if(userInfo?.available_words_count > 10){
              dispatch(setLoading(true))
              let res = await dispatch(getAvailable(userInfo))
              if(res.status == true){
                dispatch(setLoading(false))
                return true;
              }else{
                dispatch(setLoading(false))
                dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
                return false;
              }
            } 
          }
        } else{
          dispatch(openSnackBar({ status: "warning", message: t("your_acc_was_blocked") }))
          return false;
        }
      } else{
        dispatch(openSnackBar({ status: "warning", message: t("please_confirm_mail") }))
        return false;
      }
    }else{
      dispatch(openSnackBar({ status: "warning", message: t("please_sign_in") }))
      navigate("/signin")
      return false;
    }
  }

  // outline list begin
  const changeFirstOutline = (value) => {
    setFirstOutline(value)
    func_SetFirstOutline(value)
  }

  const removeFirstOutline = () => {
    setFirstOutline("")
    func_SetFirstOutline("")
  }

  const newOutline = async () => {
    // if(!generateOneOutlineState){
    //   let is_valid = validate()

    //   if(is_valid){
    //     dispatch(setLoading(true));
    //     const sendData = {
    //       title: title,
    //       keywords: keywords,
    //       tone: tone,
    //       outline: outline
    //     }

    //     let res = await dispatch(generateOneOutline(sendData))
    //     if(res != false){
    //       dispatch(setLoading(false));
    //       console.log("res", res);
    //       const { result } = res

    //       let temp = [...outline];
    //       setOutline([...temp, result])
    //       func_setOutline([...temp, result]);
    //     }else{
    //       dispatch(setLoading(false));
    //       dispatch(openSnackBar({ message: t("server_connection_error"), status: 'error' }));
    //     }
    //   }
    // }

    if(!loading){
      let available = await is_available()
      if(available == true){
        let is_valid = validate()
  
        if(is_valid){
          dispatch(setLoading(true));
  
          const sendData = {
            title: title,
            keywords: keywords,
            tone: tone,
            token: userToken,
            lang: output_language
          }
  
          let res = await dispatch(generateOutline(sendData))
          if(res.result == false){
            dispatch(setLoading(false));
            dispatch(openSnackBar({ message: t("server_connection_error") , status: 'error' }));  
          }else{
            dispatch(setLoading(false));
            const { result, token } = res
            
            let temp = [...outline];
            if(outline.length == 0){
              temp = [...temp, result[0]]
            }else{
              temp = [...temp, result[2]]
            }
            setOutline([...temp])
            func_setOutline([...temp]);

            dispatch(updateToken(token))
          }
        }
      }
    }

    // if(firstOutline){
    //   setOutline([...outline, firstOutline])
    //   func_setOutline([...outline, firstOutline])
    //   setFirstOutline("")
    //   func_SetFirstOutline("")
    // }else{
    //   dispatch(openSnackBar({ message: t("msg_please_input_outline"), status: 'error' }));
    // }
  }

  const regenerateAll = () => {
    setFirstOutline("")
    setOutline([])
    func_SetFirstOutline("")
    func_setOutline([])
  }

  const setExistOutline = (index, value) => {
    let temp = [...outline];
    temp[index] = value;
    setOutline([...temp])
    func_setOutline([...temp]);
  }

  const removeExist = (index) => {
    let temp = [...outline];
    temp.splice(index,1)
    setOutline([...temp])
    func_setOutline([...temp]);
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
    setTone(value)
  }

  const validate = (data) => {
    if(!title){
      dispatch(openSnackBar({ message: t("msg_please_input_title"), status: 'error' }));
      return false;
    }else if(!keywords){
      dispatch(openSnackBar({ message: t("msg_please_input_keywords"), status: 'error' }));
      return false;
    }
    return true;
  }

  const nextOutline = async () => {
    if(!loading){
      let available = await is_available()
      if(available == true){
        let is_valid = validate()
  
        if(is_valid){
          dispatch(setLoading(true));
  
          const sendData = {
            title: title,
            keywords: keywords,
            tone: tone,
            token: userToken,
            lang: output_language
          }
  
          let res = await dispatch(generateOutline(sendData))
          if(res.result == false){
            dispatch(setLoading(false));
            dispatch(openSnackBar({ message: t("server_connection_error") , status: 'error' }));  
          }else{
            dispatch(setLoading(false));
            const { result, token } = res
  
            setOutline(result)
            func_setOutline(result)
  
            setShowStep2(true)
            dispatch(updateToken(token))
          }
        }
      }
    }
  }

  return (
    <>
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

              <Button onClick={()=>nextOutline()} className='w-1/3 px-4'>
                Next: Outline
              </Button>
            </div>

          </div>

          {
            showStep2 &&
            <div>
              <div className='text-center py-4'>
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
                  outline.length > 0 && outline.map((data,index) => data &&
                    <div key={index} className='w-2/3 grid grid-cols-12 py-2'>
                      <div className='col-span-11'>
                        <Textarea
                          className='bg-white'
                          sizing="lg"
                          value={data}
                          row={2}
                          onChange={(e) => setExistOutline(index, e.target.value)}
                        />
                      </div>
                      <div className='col-span-1 self-center'>
                        <AiOutlineCloseCircle 
                          className='w-6 h-6 text-gray-400' 
                          onClick={()=>removeExist(index)}
                        />
                      </div>
                    </div>
                  )
                }

                {/* outline first */}
                {/* <div className='w-2/3 grid grid-cols-12 py-2'>
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
                </div> */}

                <div className='flex justify-between w-2/3 py-2'>
                  <div 
                    onClick={()=>newOutline()}
                    className='underline text-site_light-100 self-center cursor-pointer hover:text-blue-800'
                  >
                    + {t("generate_more_outline")}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div
                        onClick={()=>nextOutline()}//regenerateAll()
                        className="w-full font-medium p-1  text-sm inline-flex items-center justify-center border-2 border-transparent rounded-lg leading-5 shadow-sm transition duration-150 ease-in-out bg-site_light-100 hover:bg-blue-800 text-white cursor-pointer"
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
          }
        </div>
      </div>
    </>
  );
}

export default LongArticle;