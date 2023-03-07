import { useTranslation } from "react-i18next";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi"

function VerifyWarning() {
    const { t } = useTranslation();
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
                </Alert>
            </div>
    );
}

export default VerifyWarning;
