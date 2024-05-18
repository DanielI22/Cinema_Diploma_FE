import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";


export const pay = async (paymentInfo) => {
    try {
        const response = await axiosInstance.post(`/payments/create-payment-intent`, paymentInfo);
        return response;
    } catch (error) {
        toast.error(GENERAL_ERROR);
        return error;
    }
}