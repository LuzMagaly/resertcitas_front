import { useLocalStorage } from "../hooks/useLocalStorage"

export const Authenticate = (username: string, password: string) => {
    const { setItem } = useLocalStorage()
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