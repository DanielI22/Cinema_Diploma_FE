import axiosInstance from "../config/axiosInstance";
import { TOAST_ERROR, TOAST_SUCCESS, GENERAL_ERROR } from "../utils/constants";
import { showToast } from "../utils/toast";

export const getOne = async (ticketId) => {
    try {
        const response = await axiosInstance.get(`/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getOperatorTickets = async (cinemaId, pageNumber, pageSize) => {
    try {
        const response = await axiosInstance.get(`/tickets/history`, {
            params: {
                cinemaId,
                pageNumber,
                pageSize,
            },
        });
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getMyTickets = async () => {
    try {
        const response = await axiosInstance.get(`/tickets/my-tickets`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const buyTickets = async (orderInfo) => {
    try {
        const response = await axiosInstance.post(`/tickets`, orderInfo);
        showToast(TOAST_SUCCESS, 'messages.buySuccess');
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const getShotimePurchasedTickets = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/tickets/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};

export const validateTicket = async (ticketCode, selectedCinemaId, showtimeId) => {
    try {
        const response = await axiosInstance.get(`/tickets/validate/${ticketCode}?cinema=${selectedCinemaId}&showtime=${showtimeId}`);
        return response.data;
    } catch (error) {
        showToast(TOAST_ERROR, GENERAL_ERROR);
    }
};
