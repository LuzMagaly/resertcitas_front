//Verifica los accesos de cada usuario
import { useNavigate } from 'react-router-dom'

import { useContext } from "react";
import { AuthContext } from "providers/authContext";

export const usePermision = () => {

  const { session } = useContext(AuthContext)
  const navigate = useNavigate()

    const verify = (path: string, isComponent: boolean = false): boolean => {
        const local_path = path.substring(path.lastIndexOf('/') + 1)
        const item_found = session.permisos.find((item: any) => local_path === item.objetivo && item.estado === 'ACTIVO')
        if(!item_found && !isComponent){
            navigate('/error', { replace: true })
        }
        if(!item_found && isComponent){
          return false
        }
        return true
    }

    const showItem = (path: string): boolean => {
      return session.permisos.find((item: any) => path === item.objetivo && item.estado === 'ACTIVO')
    }

    return { verify, showItem }
  }