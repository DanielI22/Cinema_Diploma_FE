import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";


export const book = async (booking) => {
    try {
        const response = await axiosInstance.post(`/bookings`, booking);
        toast.success("Tickets booked successfully!");
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}


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