import { apiControl } from "../errors/apiControl"
import { invoke } from "../server/api"

export const getSpecialtyAll = async () => {
    const result = await invoke('/specialty/getAll', {})
    return apiControl(result)
}

export const getSpecialtyById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/specialty/getOne', payload)
    return apiControl(result)
}