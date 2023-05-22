import axios from "axios"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { url } from "../server/api"

export const Authenticate = async (username: string, password: string) => {
    const { setItem } = useLocalStorage()

    const result = await axios.post(url + '/auth/login', {
      Credentials: 'aaa|123'
    })

    console.log(result)



    console.log('authenticating..')
    if(username == 'jean' && password == '1234'){
      const result =  {
        id: '1',
        email: 'j.flores.es@hotmail.com',
        name: 'Jean',
        lastname: 'Flores',
        token: '12346578912345678912',
        photo: null
      }

      setItem('session', JSON.stringify(result))
      return result
    }
    return null
}