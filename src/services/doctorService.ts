import { apiControl } from "errors/apiControl"
import { invoke } from "server/api"

export const getDoctorAll = async () => {
    const result = await invoke('/doctor/getAll', {}, true)
    return apiControl(result)
}

export const getDoctorById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/doctor/getOne', payload, true)
    return apiControl(result)
}

export const getDoctorByUser = async (filters: any) => {
    const payload = {
        Options: filters
    }
    const result = await invoke('/doctor/getByUser', payload, true)
    return apiControl(result)
}

export const getDoctorBySpecialty = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/doctor/getBySpecialty', payload, true)
    return apiControl(result)
}

export const saveDoctor = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/doctor/save', payload, true)
    return apiControl(result)
}

export const updateDoctor = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/doctor/update', payload, true)
    return apiControl(result)
}