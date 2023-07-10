import { apiControl } from "errors/apiControl"
import { invoke } from "server/api"

export const getPatientAll = async () => {
    const result = await invoke('/patient/getAll', {}, true)
    return apiControl(result)
}

export const getPatientById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/patient/getOne', payload, true)
    return apiControl(result)
}

export const getPatientByUser = async (filters: any) => {
    const payload = {
        Options: filters
    }
    const result = await invoke('/patient/getByUser', payload, true)
    return apiControl(result)
}

export const savePatient = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/patient/save', payload, true)
    return apiControl(result)
}

export const updatePatient = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/patient/update', payload, true)
    return apiControl(result)
}

export const deletePatient = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/patient/delete', payload, true)
    return apiControl(result)
}