import {LocalStorageKey} from '@/shared/config/consts';

export const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}) => {
    const token = localStorage.getItem(LocalStorageKey.AuthToken);

    const headers = new Headers(init.headers || {});
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(input, {
        ...init,
        headers,
    });
};
