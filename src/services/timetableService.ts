import { apiControl } from "../errors/apiControl"
import { invoke } from "../server/api"

export const getTimetableById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/timetable/getOne', payload, true)
    return apiControl(result)
}

export const getTimetableByDoctor = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/timetable/getByDoctor', payload, true)
    return apiControl(result)
}

export const getTimetableBySpecialty = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/timetable/getBySpecialty', payload, true)
    return apiControl(result)
}

export const saveTimetable = async (items: any) => {
    const payload = {
        Items: items
    }
    const result = await invoke('/timetable/save', payload, true)
    return apiControl(result)
}

export const updateTimetable = async (item: any) => {
    const payload = {
        Item: item
    }
    const result = await invoke('/timetable/update', payload, true)
    return apiControl(result)
}