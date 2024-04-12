import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/bookings`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.delete(`/bookings/${bookingId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};