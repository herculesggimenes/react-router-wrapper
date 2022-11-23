import React from 'react'
import { RestQueryClient } from '../types'
import { defaultRestQueryClient } from './defaultRestQueryClient'

export const RestQueryContext = React.createContext<RestQueryClient>(defaultRestQueryClient)
export const RestQueryProvider =  ({restQueryClient, children}: {restQueryClient:RestQueryClient, children: React.ReactNode}) => <RestQueryContext.Provider value={restQueryClient} >{children}</RestQueryContext.Provider>
