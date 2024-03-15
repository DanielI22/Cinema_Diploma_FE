import { useState } from 'react';

const usePersistedState = (key, defaultValue, storageType = 'localStorage') => {
    const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;

    const [state, setState] = useState(() => {
        const persistedState = storage.getItem(key);
        return persistedState ? JSON.parse(persistedState) : defaultValue;
    });

    const setPersistedState = (value) => {
        setState(value);
        const serializedValue = JSON.stringify(value);
        storage.setItem(key, serializedValue);
    };

    return [state, setPersistedState];
};

export default usePersistedState;