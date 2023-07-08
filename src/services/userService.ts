import { apiControl } from "../errors/apiControl"
import { invoke } from "../server/api"

export const getUserAll = async () => {
  const result = await invoke('/user/getOne', {}, true)
  return apiControl(result)
}

export const getUserById = async (userId: number) => {
    const payload = {
        Id: userId
    }
    const result = await invoke('/user/getOne', payload, true)
    return apiControl(result)
}

export const getUserByDNI = async (Dni: string) => {
  const payload = {
    Options: {
      DNI: Dni
    }
  }
  const result = await invoke('/user/Find', payload, true)
  return apiControl(result)
}

export const createUser = async (payload: any) => {
  const result = await invoke('/user/save', payload, true)
  return apiControl(result)
}

export const updateUser = async (payload: any) => {
  const result = await invoke('/user/update', payload, true)
  return apiControl(result)
}

export const updatePassword = async (payload: any) => {
  const result = await invoke('/user/changePass', payload, true)
  return apiControl(result)
}
