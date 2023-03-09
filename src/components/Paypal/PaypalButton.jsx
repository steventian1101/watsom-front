import { useEffect } from "react";
import {
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

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

// function PayPalBtn({ type }) {
// 	const [{ options }, dispatch] = usePayPalScriptReducer();

// 	useEffect(() => {
//         dispatch({
//             type: "resetOptions",
//             value: {
//                 ...options,
//                 intent: "subscription",
//             },
//         });
//     }, [type]);

// 	return (
//         <PayPalButtons
//             createSubscription={(data, actions) => {
//                 return actions.subscription
//                     .create({
//                         plan_id: "P-1G033716R3091215MMQEZF4Y",
//                     })
//                     .then((orderId) => {
//                         // Your code here after create the order
//                         return orderId;
//                     });
//             }}
//             style={{
//                 label: "subscribe",
//             }}
//         />
//     );
// }

export default PayPalBtn;