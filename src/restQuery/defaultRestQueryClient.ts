import { RestQueryClient } from "../types";

export const defaultRestQueryClient : RestQueryClient = {
    get: () => Promise.resolve({ data: null,headers:new Headers() }), 
    post: () => Promise.resolve({ data: null,headers:new Headers() }), 
    put: () => Promise.resolve({ data: null,headers:new Headers() }), 
    delete: () => Promise.resolve({ data: null,headers:new Headers() }) 
};