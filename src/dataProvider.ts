import axios from 'axios' 


interface BaseRequestParams{
    pathParam?: string | number;
    queryParams?: any;
    customBaseUrl?: string;
}

interface BaseRequestResult<DataType = any> {
    data: DataType[] | DataType;
    headers: Headers;
}

interface GetParams extends BaseRequestParams{
}

interface DeleteParams extends BaseRequestParams{
}

interface PostParams extends BaseRequestParams {
    body: any
}

interface PutParams extends BaseRequestParams {
    body: any
}


interface GetResult<DataType=any> extends BaseRequestResult {
    
}

interface PostResult<DataType=any> extends BaseRequestResult {
    
}




interface DataProvider  {
    get: <DataType = any> (endpoint: string, params:GetParams) => Promise<GetResult<DataType>>;
    post: <DataType = any> (endpoint: string, params:PostParams) => PostResult<GetResult<DataType>>;

}
const apiProvider : DataProvider = {

}


export default apiProvider