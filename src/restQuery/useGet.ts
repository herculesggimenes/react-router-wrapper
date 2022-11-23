import React from 'react'
import { UseQueryResult, UseQueryOptions, useQuery } from 'react-query'
import restQueryClient from '../examples/restQueryClient'
import { GetParams, GetResult } from '../types'
import { useRestQueryClient } from './useRestQueryContext'

export function useGet<RecordType = any> (
    endpoint: string,
    params?: Partial<GetParams>,
    options?: UseQueryOptions<GetResult<RecordType[]>, Error>
): UseQueryResult<GetResult<RecordType[]>,Error> {
    const restQueryClient = useRestQueryClient();
    if (!params){
        params = {}
    }
    const {customBaseUrl,pathParam,queryParams} = params

    const result = useQuery<
    GetResult<RecordType[]>,
    Error,
    GetResult<RecordType[]>
    >(
        [
            endpoint,
            'useGet',
            {customBaseUrl, pathParam,queryParams}
        ],
        {
            ...options,
            queryFn: () => restQueryClient.get<RecordType>(endpoint,
                {customBaseUrl:customBaseUrl,pathParam:pathParam,queryParams:queryParams})
                .then(({data, headers})=>({data:data,headers:headers}))
            
        }

    )

    return result
}