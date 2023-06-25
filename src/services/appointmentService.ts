import { apiControl } from "../errors/apiControl"
import { invoke } from "../server/api"

export const getAppointmentById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/appointment/getOne', payload, true)
    return apiControl(result)
}

export const getAppointmentByPatient = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/appointment/getByPatient', payload, true)
    return apiControl(result)
}

export const saveAppointment = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/appointment/save', payload, true)
    return apiControl(result)
}

export const updateAppointment = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/appointment/update', payload, true)
    return apiControl(result)
}