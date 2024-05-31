import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";


export const book = async (bookingInfo) => {
    try {
        const response = await axiosInstance.post(`/bookings`, bookingInfo);
        toast.success("Tickets booked successfully!");
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const getMyBookings = async () => {
    try {
        const response = await axiosInstance.get(`/bookings/my-bookings`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getShotimeBookings = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/bookings/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.put(`/bookings/${bookingId}`);
        toast.success("Booking is cancelled successfully");
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};


export const validateBooking = async (bookingCode, selectedCinemaId) => {
    const response = await axiosInstance.get(`/bookings/validate/${bookingCode}?cinema=${selectedCinemaId}`);
    return response;
};

export const takeBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.get(`/bookings/take/${bookingId}`);
        toast.success("Booking is taken successfully");
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};