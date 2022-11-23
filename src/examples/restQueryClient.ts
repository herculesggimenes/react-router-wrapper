
import {RestQueryClient, GetParams, PostParams, PutParams, DeleteParams, GetResult, PostResult, PutResult, DeleteResult, RequestOptions } from '../types'
import {stringify} from 'query-string'
import { apiUrl } from './globals';
import { apiClient } from '../restQuery';





const restQueryClient : RestQueryClient = {
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



export default restQueryClient