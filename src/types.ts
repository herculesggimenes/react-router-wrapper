// Data Fetching

import { AxiosRequestConfig } from "axios";

export interface RequestOptions extends RequestInit {
    user?: {
        authenticated?: boolean
        token?: string
    }
}



// Data Providers

export interface BaseRequestParams{
    pathParam?: string | number;
    queryParams?: any;
    customBaseUrl?: string;
}

export interface BaseRequestResult<DataType = any> {
    data: DataType[] | DataType;
    headers: Headers;
}

export interface GetParams extends BaseRequestParams{
}


export interface PostParams extends BaseRequestParams {
    body: any
}

export interface PutParams extends BaseRequestParams {
    body: any
}

export interface DeleteParams extends BaseRequestParams{
}


export interface GetResult<DataType=any> extends BaseRequestResult {
    
}

export interface PostResult<DataType=any> extends BaseRequestResult {
    
}

export interface PutResult<DataType=any> extends BaseRequestResult {
    
}

export interface DeleteResult<DataType=any> extends BaseRequestResult {
    
}

export interface RestQueryClient  {
    get: <DataType = any> (endpoint: string, params:GetParams) => Promise<GetResult<DataType>>;
    post: <DataType = any> (endpoint: string, params:PostParams) => Promise<PostResult<DataType>>;
    put: <DataType = any> (endpoint: string, params:PutParams) => Promise<PutResult<DataType>>;
    delete: <DataType = any> (endpoint: string, params:PostParams) => Promise<DeleteResult<DataType>>;

}