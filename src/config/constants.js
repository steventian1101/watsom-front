const DEV_MODE = true;
export const GPT_SERVER = DEV_MODE == true?'http://localhost:3333':'https://watsom.onrender.com';
export const API_BASE = DEV_MODE == true?'http://localhost:4000/api':'https://watsom-api.onrender.com/api';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
export const APP_SECRET = process.env.REACT_APP_APP_SECRET
export const SECRET_KEY= process.env.REACT_APP_SECRET_KEY
export const PLAN_ESSENTIAL= process.env.REACT_APP_PLAN_ESSENTIAL 
export const PLAN_PRO_MONTH= process.env.REACT_APP_PLAN_PRO_MONTH
export const PLAN_PRO_YEAR= process.env.REACT_APP_PLAN_PRO_YEAR