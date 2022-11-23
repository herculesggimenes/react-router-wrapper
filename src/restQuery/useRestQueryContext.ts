import React from 'react'
import { RestQueryClient } from "../types";
import { defaultRestQueryClient } from './defaultRestQueryClient';
import { RestQueryContext } from './restQueryContext';

export const useRestQueryClient = <TRestQueryClient extends RestQueryClient = RestQueryClient>(): TRestQueryClient => {
    const restQueryClient = ((React.useContext(RestQueryContext) || defaultRestQueryClient)) as TRestQueryClient
    return restQueryClient
}