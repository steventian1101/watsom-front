import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Card, TextInput } from 'flowbite-react';
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import TemplateSearch from './TemplateSearch';

function Content({
}) {
  const { t } = useTranslation();

  return (
    <div>
      <TemplateSearch />
    </div>
  );
}

export default Content;