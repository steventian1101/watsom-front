import React from 'react';
import { Link } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'
import Header from '../components/Template/Header';

function SubScription() {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const { userInfo } = authState;

  return (
    <div>
        <Header />

        <div className='h-6 bg-site_light-100 text-white text-center text-sm font-bold w-full'>
            {t("future")} of WatSom 🎉
        </div>

        <div className='flex justify-center min-h-screen pt-[30px] px-[40px]'>
            <div className="w-3/5">
                <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
                    Your Subscription
                </p>

                <div>
                    <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
                        Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi eleifend faucibus.
                    </p>
                </div>

                <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
                    <PlanCard plan={1} />
                    <PlanCard plan={2} />
                    <PlanCard plan={3} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default SubScription;