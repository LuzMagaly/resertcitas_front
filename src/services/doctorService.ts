import { invoke } from "../server/api"

export const getDoctorAll = async () => {
    const result = await invoke('/doctor/getAll', {}, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getDoctorById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/doctor/getOne', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getDoctorByUser = async (filters: any) => {
    const payload = {
        Options: filters
    }
    const result = await invoke('/doctor/getByUser', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getDoctorBySpecialty = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/doctor/getBySpecialty', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const saveDoctor = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/doctor/save', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const updateDoctor = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/doctor/update', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}