
import axios from "axios";
const BASE_URL = "https://api-carrinho-de-compra.vercel.app"
export const api = axios.create({
    baseURL: BASE_URL,
    validateStatus: (status) => status < 500
});

