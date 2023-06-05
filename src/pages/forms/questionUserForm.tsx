import { useState } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { getUserByDNI } from '../../services/userService'

const QuestionUserForm = ({ onSelectUser }: { onSelectUser: any }) => {

    const [dni, setDni] = useState('12345671')
    const [data, setData] = useState<any>()

    const registerNewPerson = () => {
      onSelectUser(1, null)
    }

    const useExistPerson = () => {
      onSelectUser(2, data)
    }

    const handleChangeDNI = (event: any) => {
      const value = event.target.value
      if(value.length <= 8){
        setDni(value)
      }

      setData(undefined)

      if(value.length >= 8){
        findPerson(value)
      }
    }

    const findPerson = async (value: string) => {
      const result = await getUserByDNI(value)
      if(result && result[0] && result[0].DNI){
        setData(result[0])
      }
    }

    return (
            <div className="text-center d-flex justify-content-center">
              <div style={{ maxWidth: '500px' }}>
              <span>Registra una nueva persona</span><br/><br/>
                <Button variant="success" onClick={ registerNewPerson }>Nuevo Usuario</Button>
                <br/><br/><hr/><br/>

                <span>O busca una persona ya registrada</span><br/><br/>
                <InputGroup className="mb-3">
                  <Form.Control value={ dni } type="number" minLength={ 8 } maxLength={ 8 } onChange={ handleChangeDNI } placeholder="DNI (8 dígitos)"/>
                  <Button variant={ (data && data.DNI) ? 'primary' : 'secondary' } disabled={ (data && data.DNI) ? false : true } onClick={ useExistPerson } id="button-addon2">Seleccionar</Button>
                </InputGroup>
                {
                  (data && data.DNI) && <span>{ data.Nombres + ' ' + data.Apellido_Paterno + ' ' + data.Apellido_Materno }</span>
                }
              </div>
            </div>
      )
}

export default QuestionUserForm