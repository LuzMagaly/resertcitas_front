import axios from "axios"
import { url } from "../server/api"

export const specialtyService = async () => {

    const result = await axios.post(url + '/specialty/getAll')
    if(result && result.data){
        return result.data
    }
    return null
}