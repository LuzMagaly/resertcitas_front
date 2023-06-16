import { invoke } from "../server/api"

export const getScheduleById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/schedule/getOne', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getScheduleByDoctor = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/schedule/getByDoctor', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getScheduleBySpecialty = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/schedule/getBySpecialty', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const saveSchedule = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/schedule/save', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const updateSchedule = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/schedule/update', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}