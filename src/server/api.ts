import axios from "axios"
export const url = 'http://localhost:4500'

export const invoke = async (path: string, data: any, isAuthenticated: boolean = true, method: string = 'POST') => {
    const instance = axios.create({
        baseURL: url,
        timeout: 0,
        headers: { 'Content-Type': "application/json" }
    });

    if(!!isAuthenticated && method === 'POST'){
        data.Token = ''
    }

    return await instance({
        url: path,
        method: method,
        data: data
    })
}