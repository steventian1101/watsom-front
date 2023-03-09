import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react'

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import PayPalBtn from './Paypal/PaypalButton';

import { PLAN_ESSENTIAL, PLAN_PRO_MONTH, PLAN_PRO_YEAR, SECRET_KEY } from '../config/constants';

function PlanCard({plan}) {
  const { authState } = useSelector((state) => state);
  const { t } = useTranslation();
	const dispatch = useDispatch();
	
	const plan_essential = PLAN_ESSENTIAL;
	const plan_pro_month = PLAN_PRO_MONTH;
	const plan_pro_year = PLAN_PRO_YEAR;

  const { userInfo, loggedIn } = authState;
  const plan_list = [t("free_trial"), t("essential"), t("pro_month"), t("pro_year")]
	const plan_cost = [ 0, 9, 49, 348 ]
	const plan_period = [t("month"), t("month"), t("month"), t("year")]

	const plan_private_offer = [t("generate_5000_words_week"), t("generate_100000_words_month"), t("generate_unlimited_content"), t("generate_unlimited_content")]
	const plan_common_offer = [
		t("access_10_tones"),
		t("access_to_all_writing_tools"),
		t("long_form_editor_keywords"),
		t("write_3_language"),
		t("24_7_priority_support"),
		t("lock_low_price"),
		t("cancel_any_time")
	]

	const plan_id = ["Free", plan_essential, plan_pro_month, plan_pro_year]

	const paypalSubscribe = (data, actions) => {
			return actions.subscription.create({
					'plan_id': plan_id[plan]
			});
	};

	const paypalOnError = (err) => {
			console.log("Error")
	}

	const paypalOnApprove = (data, detail) => {
			// call the backend api to store transaction details
			console.log("Payapl approved")
			console.log(data.subscriptionID)

			let payload = {...userInfo, new_plan: plan}

			// jwt.sign(
			// 	payload,
			// 	SECRET_KEY, {
			// 			expiresIn: 31556926 // 1 year in seconds
			// 	},
			// 	(err, token) => {
			// 		// dispatch(upgradePlan(token))
			// 	}
			// );

	};

  return (
    <Card>
			<h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
				{plan_list[plan]}
			</h5>
			<div className="flex items-baseline text-gray-900 dark:text-white">
				<span className="text-3xl font-semibold">
					$
				</span>
				<span className="text-5xl font-extrabold tracking-tight">
					{plan_cost[plan]}
				</span>
				<span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
					/{plan_period[plan]}
				</span>
			</div>
			<ul
				role="list"
				className="my-7 space-y-5"
			>
				<li className="flex space-x-3">
					<svg
						className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
					<span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
						{plan_private_offer[plan]}
					</span>
				</li>
				{
					plan_common_offer.map((data, index) => 
						<li className="flex space-x-3" key={index}>
							<svg
								className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
								{data}
							</span>
						</li>
					)
				}
			
			{/* impossible feature
				<li className="flex space-x-3 line-through decoration-gray-500">
					<svg
						className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
					<span className="text-base font-normal leading-tight text-gray-500">
						Sketch Files
					</span>
				</li> */}
				
			</ul>
			{/* <PayPalButton type="subscription" /> */}
			{
				loggedIn == true &&
				<PayPalBtn
					amount = {plan_cost[plan]}
					currency = "USD"
					createSubscription={paypalSubscribe}
					onApprove={paypalOnApprove}
					catchError={paypalOnError}
					onError={paypalOnError}
					onCancel={paypalOnError}
				/>
			}
			{/* <button
				type="button"
				className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
			>
				{t("choose_plan")}
			</button> */}
		</Card>
  );
}

export default PlanCard;