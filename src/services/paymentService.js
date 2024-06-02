import { GENERAL_ERROR, TOAST_ERROR } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";
import { showToast } from "../utils/toast";


export const pay = async (paymentInfo) => {
    try {
        const response = await axiosInstance.post(`/payments/create-payment-intent`, paymentInfo);
        return response;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
        return error;
    }
}