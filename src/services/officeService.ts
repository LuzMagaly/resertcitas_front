import { apiControl } from "errors/apiControl"
import { invoke } from "server/api"

export const getOfficeAll = async () => {
    const result = await invoke('/office/getAll', {}, true)
    return apiControl(result)
}

export const getOfficeById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/office/getById', payload, true)
    return apiControl(result)
}

export const getOfficeBySpecialty = async (id: string) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/office/getBySpecialty', payload, true)
    return apiControl(result)
}