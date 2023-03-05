import { useTranslation } from "react-i18next";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi"

function VerifyWarning() {
    const { t } = useTranslation();
    return (
        <Alert
            color="failure"
            icon={HiInformationCircle}
            className="fixed z-50"
        >
            <span>
                <span className="font-medium">
                {t("Confirm Mail")}!
                </span>
                {' ' + t("Please Check your InBox.")}.
            </span>
        </Alert>
    );
}

export default VerifyWarning;
