import React from 'react'
import { useGet } from '../restQuery/useGet'
export const UseGetComponent: React.FC = () => {
    const {data: activities} = useGet('Activities')

    console.log(activities)
    return (
        <div>
            teste
        </div>
    )
}