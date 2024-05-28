export const emitEvent = (eventName, detail = {}) => {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
};
