import { apiControl } from "errors/apiControl"
import { invoke } from "server/api"

export const getPermisionsAll = async () => {
    const result = await invoke('/permisions/getAll', {})
    return apiControl(result)
}

export const getRolesAll = async () => {
    const result = await invoke('/roles/getAll', {})
    return apiControl(result)
}

export const insertPermisionRol = async (Items: any) => {
    const result = await invoke('/permisionRol/insert', Items)
    return apiControl(result)
}
