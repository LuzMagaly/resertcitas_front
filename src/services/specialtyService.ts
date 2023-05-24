import axios from "axios"
import { invoke } from "../server/api"

export const specialtyService = async () => {

    const result = await invoke('/specialty/getAll', {})
    if(result && result.data){
        return result.data
    }
    return null
}