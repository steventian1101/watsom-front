const DEV_MODE = true;
export const GPT_SERVER = DEV_MODE == true?'http://localhost:3333':'https://watsom.onrender.com';
export const API_BASE = DEV_MODE == true?'http://localhost:3000':'https://watsom.onrender.com';