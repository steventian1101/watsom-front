import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { confirmMail } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom'

function ConfirmMail(props) {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const routeParams = useParams();
  
  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        if(routeParams.confirm_token){
          let res = await dispatch(confirmMail(routeParams.confirm_token))

          if(res.status != false){
            dispatch(openSnackBar({ status: "success", message: t("confirm_success") }))
            navigate('/template')
          }else{
            dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
            navigate('/template')
          }
        }
      } catch (err) {
        console.log('Error occured when fetching books');
      }
    })();
  }, []);
  
  return (
    <main className="bg-white">
      {t("Confirm Mail")}
    </main>
  );
}

export default ConfirmMail;