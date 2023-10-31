import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
