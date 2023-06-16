import { invoke } from "../server/api"

export const getSpecialtyAll = async () => {
    const result = await invoke('/specialty/getAll', {})
    if(result && result.data){
        return result.data
    }
    return null
}

export const getSpecialtyById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/specialty/getOne', payload)
    if(result && result.data){
        return result.data
    }
    return null
}