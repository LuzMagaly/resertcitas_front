import { invoke } from "../server/api"

export const getTimetableById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/timetable/getOne', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getTimetableByDoctor = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/timetable/getByDoctor', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getTimetableBySpecialty = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/timetable/getBySpecialty', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const saveTimetable = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/timetable/save', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const updateTimetable = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/timetable/update', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}