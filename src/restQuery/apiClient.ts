import { RequestOptions } from "../types";

const createHeadersFromOptions = (options: RequestOptions): Headers => {
    const requestHeaders = (options.headers || new Headers({Accept:'application/json'})) as Headers

    
    if (
        !requestHeaders.has('Content-Type') &&
        !(options && (!options.method || options.method === 'GET')) &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }

    return requestHeaders;
};

export const apiClient = (endpoint : string, options: RequestOptions = {}) => {
    const requestHeaders = createHeadersFromOptions(options)

    return fetch(endpoint, { ...options, headers: requestHeaders })
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            }))
        )
        .then(({ status, statusText, headers, body }) => {
            let json;
            try {
                json = JSON.parse(body);
            } catch (e) {
                // not json, no big deal
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(
                    new Error(
                        (json && json.message) || statusText,
                    )
                );
            }
            return Promise.resolve({ status, headers, body, json });
        });
};