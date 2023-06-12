import { invoke } from "../server/api"

export const getOfficeAll = async () => {
    const result = await invoke('/office/getAll', {}, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const getOfficeById = async (id: number) => {
    const payload = {
        Id: id
    }
    const result = await invoke('/office/getById', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}