import { Button, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'
import Header from '../components/Template/Header';
import { useNavigate } from 'react-router-dom'
import dateFormat from "dateformat";
import WordsUsage from '../components/WordsUsage';

function Setting() {

  const [sync, setSync] = useState(false);
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const { userInfo, loggedIn } = authState;
  const navigate = useNavigate()

  const plan_list = [t("free_trial"), t("essential"), t("pro_month"), t("pro_year")]

  useEffect(() => {
    if(loggedIn != true){
      navigate("/")
    }
  }, [loggedIn]);

  return (
    <div>
        <Header />

        <div className='h-6 bg-site_light-100 text-white text-center text-sm font-bold w-full'>
            {t("future")} of WatSom 🎉
        </div>

        <div className='flex justify-center min-h-screen pt-[30px] px-[40px]'>
            <div className="w-3/5">
                <div className="grow">
                    {/* Panel body */}
                    <div className="p-6 space-y-6">
                        <h2 className="text-2xl text-slate-800 font-bold mb-5">{t("my_account")}</h2>
                        {/* Subscription */}
                        <section>
                            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">{t("subscription")}</h2>
                            <div className='py-1'>{t("you_created_acc_on")} <b>{dateFormat(userInfo?.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</b></div>
                            <div className='py-1'>{t("you_currently_on")} <b>{plan_list[userInfo?.plan]}</b> plan</div>
                            <div className='pt-1 pb-4'>{t("your_expiry_date")} <b>{dateFormat(userInfo?.plan_finish_date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</b></div>
                            
                            {
                                userInfo?.plan < 2 &&
                                <WordsUsage />
                            }
                        </section>
                        {/* Full Name */}
                        <section>
                            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">{t("full_name")}</h2>
                            <div className="grid grid-cols-3 mt-5 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-xl text-gray-400 font-medium mb-1" htmlFor="name">{userInfo?.name}</label>
                                </div>
                                <div className="col-span-1">
                                    <TextInput id="business-id" className="form-input w-full" placeholder={t("new_name")} type="text" />
                                </div>
                                <div className="col-span-1">
                                    <Button className='float-right w-40'>{t("update_full_name")}</Button>
                                </div>
                            </div>
                        </section>
                        {/* Email */}
                        <section>
                            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">{t("email")}</h2>
                            <div className="grid grid-cols-3 mt-5 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-xl text-gray-400 font-medium mb-1" htmlFor="email">{userInfo?.email}</label>
                                </div>
                                <div className="col-span-1">
                                    <TextInput id="email" className="form-input w-full" placeholder={t('new_email')} type="email" />
                                </div>
                                <div className="col-span-1">
                                    <Button className='float-right w-40'>{t("update_email")}</Button>
                                </div>
                            </div>
                        </section>
                        {/* Password */}
                        <section>
                            <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">{t("password")}</h2>
                            <div className="grid grid-cols-3 mt-5 gap-4">
                                <div className="col-span-1">
                                    <TextInput id="old_password" className="form-input w-full" placeholder={t('old_password')} type="password" />
                                </div>
                                <div className="col-span-1">
                                    <TextInput id="new_password" className="form-input w-full" placeholder={t('new_password')} type="password" />
                                </div>
                                <div className="col-span-1">
                                    <Button className='float-right w-40'>{t("update_password")}</Button>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Panel footer */}
                    {/* <footer>
                        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
                        <div className="flex self-end">
                            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancel</button>
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
                        </div>
                        </div>
                    </footer> */}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Setting;