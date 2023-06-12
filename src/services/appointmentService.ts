import { invoke } from "../server/api"

export const getAppointmentById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/appointment/getOne', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getAppointmentByPatient = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/appointment/getByPatient', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const saveAppointment = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/appointment/save', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const updateAppointment = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/appointment/update', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}