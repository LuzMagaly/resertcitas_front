import { Session } from "../hooks/useSession"

export const Authenticate = (username: string, password: string): Session | null => {
    //console.log(`usuario: ${ username } contraseña: ${ password }`)
    const result: Session = {
        id: '',
        email: '',
        name: '',
        lastname: '',
        authToken: '',
        photo: ''
      }
    return result
}