import { toast } from "react-toastify";
import { GENERAL_ADD, GENERAL_DELETE, GENERAL_ERROR, GENERAL_UPDATE } from "../utils/constants";
import axiosInstance from "../config/axiosInstance";

export const getAll = async () => {
    try {
        const response = await axiosInstance.get(`/halls`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getAvailable = async () => {
    try {
        const response = await axiosInstance.get(`/halls/available`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getOne = async (hallId) => {
    try {
        const response = await axiosInstance.get(`/halls/${hallId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const getShowtimeHall = async (showtimeId) => {
    try {
        const response = await axiosInstance.get(`/halls/showtimes/${showtimeId}`);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};

export const addHall = async (hall) => {
    try {
        const response = await axiosInstance.post(`/halls`, hall);
        toast.success(GENERAL_ADD);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
}

export const editHall = async (hallId, hall) => {
    try {
        const response = await axiosInstance.put(`/halls/${hallId}`, hall);
        toast.success(GENERAL_UPDATE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};


export const deleteHall = async (hallId) => {
    try {
        const response = await axiosInstance.delete(`/halls/${hallId}`);
        toast.success(GENERAL_DELETE);
        return response.data;
    } catch (error) {
        toast.error(GENERAL_ERROR);
    }
};