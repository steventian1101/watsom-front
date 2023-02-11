import React from 'react';
import  { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Header from '../../components/Dashboard/Header';
import LeftBar from '../../components/Dashboard/LeftBar';

export default function Index() {
  return (
      <div>
        <Header />

        <div className='h-6 bg-blue-700 text-white text-center text-sm font-bold'>
          Future of WatSom 🎉
        </div>

        <div className='flex w-full'>
          <div className='w-1/5'>
            <LeftBar/>
          </div>
          <div className='w-4/5'>

          </div>
        </div>

      </div>
  );
}
