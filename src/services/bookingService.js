import { showToast } from "../utils/toast";
import axiosInstance from "../config/axiosInstance";
import { TOAST_SUCCESS, TOAST_ERROR, GENERAL_ERROR } from "../utils/constants";

export const book = async (bookingInfo) => {
    try {
        const response = await axiosInstance.post(`/bookings`, bookingInfo);
        showToast(TOAST_SUCCESS, 'messages.bookingSuccess');
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getMyBookings = async () => {
    try {
        const response = await axiosInstance.get(`/bookings/my-bookings`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getShowtimeBookings = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/bookings/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.put(`/bookings/${bookingId}`);
        showToast(TOAST_SUCCESS, 'messages.bookingCancelled');
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const validateBooking = async (bookingCode, selectedCinemaId) => {
    const response = await axiosInstance.get(`/bookings/validate/${bookingCode}?cinema=${selectedCinemaId}`);
    return response;
};

export const takeBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.put(`/bookings/take/${bookingId}`);
        showToast(TOAST_SUCCESS, 'messages.bookingTaken');
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
