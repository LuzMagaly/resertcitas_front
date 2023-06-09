import { apiControl } from "errors/apiControl"
import { invoke } from "server/api"

export const getScheduleById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/schedule/getOne', payload, true)
    return apiControl(result)
}

export const getScheduleByDoctor = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/schedule/getByDoctor', payload, true)
    return apiControl(result)
}

export const getScheduleBySpecialty = async (payload: any) => {
    const result = await invoke('/schedule/getBySpecialty', payload, true)
    return apiControl(result)
}

export const getScheduleBasicBySpecialty = async (payload: any) => {
    const result = await invoke('/schedule/getBasicBySpecialty', payload, true)
    return apiControl(result)
}

export const saveSchedule = async (payload: any) => {
    const result = await invoke('/schedule/save', payload, true)
    return apiControl(result)
}

export const updateSchedule = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/schedule/update', payload, true)
    return apiControl(result)
}