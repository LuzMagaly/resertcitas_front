import { invoke } from "../server/api"

export const getUserById = async (userId: number) => {
    const payload = {
        Id: userId
    }
    const result = await invoke('/user/getOne', payload, true)
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}

export const createUser = async (payload: any) => {
  const result = await invoke('/user/save', payload, true)
  let data = null
  if(result && result.data){
    data = result.data
  }
  return data
}

export const updateUser = async (payload: any) => {
  const result = await invoke('/user/update', payload, true)
  let data = null
  if(result && result.data){
    data = result.data
  }
  return data
}

export const updatePassword = async (payload: any) => {
  const result = await invoke('/user/changePass', payload, true)
  let data = null
  if(result && result.data){
    data = result.data
  }
  return data
}
