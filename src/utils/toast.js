import { toast } from 'react-toastify';
import i18n from '../locales/i18n';

// Utility function for translated toasts
export const showToast = (type, key, options = {}) => {
    const message = i18n.t(key);
    console.log(message);
    toast[type](message, options);
};
