import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Progress } from 'flowbite-react'

import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux'

function WordsUsage({isMB}) {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const { userInfo } = authState;

  const available_words_count = [5000, 100000]

  return (
    <Card className={`${isMB && "mb-24"} justify-end mt-auto cursor-default`}>
      <h5 className="text-xl font-bold tracking-tight text-gray-900">
        {t("words_usage")}
      </h5>
      <Progress 
        progress={100 - parseInt(userInfo?.available_words_count / available_words_count[userInfo?.plan] * 100)}
      />
      <div className='text-gray-400'>{100 - parseInt(userInfo?.available_words_count / available_words_count[userInfo?.plan] * 100)}% {t("of_your_plan")}</div>
      <Link to="#"><u className='text-blue-700'>{t("upgrade_to_pro")}</u></Link>
    </Card>
  );
}

export default WordsUsage;