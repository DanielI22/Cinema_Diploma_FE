import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";


export const buyTickets = async (orderInfo) => {
    try {
        const response = await axiosInstance.post(`/tickets`, orderInfo);
        toast.success("Tickets bought succesfully!");
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const getShotimePurchasedTickets = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/tickets/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};