
import {DataProvider, GetParams, PostParams, PutParams, DeleteParams, GetResult, PostResult, PutResult, DeleteResult, RequestOptions } from './types'
import {stringify} from 'query-string'
import { apiUrl } from './globals';


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

const apiClient = (endpoint : string, options: RequestOptions = {}) => {
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



const apiProvider : DataProvider = {
    get: (endpoint: string, params:GetParams) => {
        const queryParams =  stringify(params.queryParams)
        let url = `${params.customBaseUrl ? params.customBaseUrl : apiUrl}/${endpoint}`
        
        if (params.pathParam){
            url += `/${params.pathParam}`
        }

        url += `?${queryParams}`

        return apiClient(endpoint).then(({json,headers}) => ({data:json, headers:headers}))
    },
    post:(endpoint: string, params:PostParams) => {
        const queryParams =  stringify(params.queryParams)
        let url = `${params.customBaseUrl ? params.customBaseUrl : apiUrl}/${endpoint}`
        
        if (params.pathParam){
            url += `/${params.pathParam}`
        }

        url += `?${queryParams}`

        return apiClient(endpoint,{
            method:'POST',
            body: JSON.stringify(params.body)
        }).then(({json,headers}) => ({data:json, headers:headers}))
    },
    put: (endpoint: string, params:PutParams) => {
        const queryParams =  stringify(params.queryParams)
        let url = `${params.customBaseUrl ? params.customBaseUrl : apiUrl}/${endpoint}`
        
        if (params.pathParam){
            url += `/${params.pathParam}`
        }

        url += `?${queryParams}`

        return apiClient(endpoint,{
            method:'PUT',
            body: JSON.stringify(params.body)
        }).then(({json,headers}) => ({data:json, headers:headers}))
    },
    delete: (endpoint: string, params:DeleteParams) => {
        const queryParams =  stringify(params.queryParams)
        let url = `${params.customBaseUrl ? params.customBaseUrl : apiUrl}/${endpoint}`
        
        if (params.pathParam){
            url += `/${params.pathParam}`
        }

        url += `?${queryParams}`

        return apiClient(endpoint,{
            method:'DELETE'
        }).then(({json,headers}) => ({data:json, headers:headers}))
    },
}



export default apiProvider