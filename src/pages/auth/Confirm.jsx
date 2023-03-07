import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { confirmMail } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading';

function ConfirmMail(props) {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const routeParams = useParams();
  
  console.log("confirm password : ", routeParams)
  
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
            dispatch(openSnackBar({ status: "warning", message: t("invalid_token") }))
            navigate('/template')
          }
        }
      } catch (err) {
        console.log('Error occured when fetching data');
      }
    })();
  }, []);
  
  return (
    <main className="bg-white">
      <Loading />
    </main>
  );
}

export default ConfirmMail;