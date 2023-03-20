import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { openSnackBar } from "../../redux/snackBarReducer";

function Subscription() {
    const { t } = useTranslation();
    const { globalState } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => { }, []);

    const gotoSubsciption = () => {

    }

    return (
        <>
            <Link className="flex items-center pr-4 ml-4" to="/subscription" >
                <div
                    className="w-full font-medium p-1  text-sm inline-flex items-center justify-center border-2 border-transparent rounded-lg leading-5 shadow-sm transition duration-150 ease-in-out bg-site_light-100 hover:!bg-site_light-100 text-white cursor-pointer"
                >

                    <span className="py-1 px-2 text-xs lg:tex-sm">{t("try")} WatSom {t("pro")}</span>
                </div>
            </Link>
        </>
    );
}

export default Subscription;