import { useTranslation } from "react-i18next";
import { Alert } from "flowbite-react";
import { openSnackBar } from '../redux/snackBarReducer';
import { useDispatch, useSelector } from 'react-redux'
import { HiInformationCircle } from "react-icons/hi"
import { resendConfirmMail } from "../redux/authReducer";
import { setLoading } from '../redux/globalReducer';

function VerifyWarning() {
    const { authState } = useSelector((state) => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { userInfo } = authState;

    const resendMail = async () => {
        if(!userInfo?.isVerified){
            dispatch(setLoading(true));
            let res = await dispatch(resendConfirmMail({email : userInfo?.email}))
            if(res.status != false){
                dispatch(setLoading(false));
                dispatch(openSnackBar({ status: "success", message: t("resend_success") }))
            }else{
                dispatch(setLoading(false));
                dispatch(openSnackBar({ status: "warning", message: t(res.result) }))
            }
            // console.log("success")
        }else{
            dispatch(openSnackBar({ status: "warning", message: t("already_verified") }))
        }
    }

    return (
            <div className="flex justify-center">
                <Alert
                    color="failure"
                    icon={HiInformationCircle}
                    className="fixed z-50"
                >
                    <span>
                        <span className="font-medium">
                        {t("confirm_mail")}!
                        </span>
                        {' ' + t("please_check_your_inbox")}.
                    </span>
                    <div onClick={() => resendMail()} className="text-site_light-100 hover:!text-blue-800 flex justify-end cursor-pointer">
                        {t("resend")}...
                    </div>
                </Alert>
            </div>
    );
}

export default VerifyWarning;
