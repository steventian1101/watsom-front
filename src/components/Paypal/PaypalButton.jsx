import { PayPalButton } from "react-paypal-button-v2";
import { CLIENT_ID } from "../../config/constants";

export function PayPalBtn(props) {
    const { amount, currency, createSubscription, onApprove, catchError,onError, onCancel} = props;
    const paypalKey = CLIENT_ID
    
    return (
        <PayPalButton
            amount={amount}
            currency={currency}
            createSubscription={(data, details) => createSubscription(data, details)}
            onApprove={(data, details) => onApprove(data, details)}
            onError={(err) => onError(err)}
            catchError={(err) => catchError(err)}
            onCancel={(err) => onCancel(err)}
            options={{
                clientId: paypalKey,
                vault:true
            }}
            style={{
                shape: 'pill',
                color: 'blue',
                layout: 'horizontal',
                label: 'subscribe',
            }}
        />
    );
}

export default PayPalBtn;