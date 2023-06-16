import { invoke } from "../server/api"

export const getPatientAll = async () => {
    const result = await invoke('/patient/getAll', {}, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getPatientById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/patient/getOne', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getPatientByUser = async (filters: any) => {
    const payload = {
        Options: filters
    }
    const result = await invoke('/patient/getByUser', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const savePatient = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/patient/save', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const updatePatient = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/patient/update', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const deletePatient = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/patient/delete', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}