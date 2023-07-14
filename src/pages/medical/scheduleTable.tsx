import { useEffect, useState } from "react"
import { Modal, InputGroup, Button, Table, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons"

export const ScheduleTable = ({ show, handleClose, onSave, value }: { show: boolean, handleClose: any, onSave: any, value: any[] }) => {

    const [dataList, setDataList] = useState<any[]>([])
    const [dataShow, setDataShow] = useState<any[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        loadList()
    }, [value])

    useEffect(() => {
        if(dataList && dataList.length && dataList.length > 0){
            assignList()
        }
    }, [search])

  const loadList = () => {
    const result: any[] = []
    value.map((item: any) => {
        const itm = {
            id: item.Medicos.Id,
            nombres: `${ item.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Paterno } ${ item.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Apellido_Materno }, ${ item.Medicos.Usuarios_Medicos_Id_UsuarioToUsuarios.Nombres }`,
            especialidad: item.Medicos.Especialidades.Nombre,
            id_especialidad: item.Medicos.Id_Especialidad,
            check: false
        }
        result.push(itm)
    })
    const resultDistinct = result.filter((n: any, i: any) => result.findIndex((f: any) => f.id === n.id) === i)
    resultDistinct.sort((a,b) => b.id_especialidad - a.id_especialidad)
    setDataList(resultDistinct)
    setDataShow(resultDistinct)
  }

  const selectColumn = (id: number) => {
    const items = dataList
    const found = items.findIndex((_: any) => _.id == id)
    items[found].check = !items[found].check
    setDataList(items)
    assignList()
  }

  const filterRows = (event: any) => {
    const value = event.target.value
    setSearch(value)
  }

  const deleteFilter = () => {
    setSearch('')
    setDataShow(dataList)
  }

  const assignList = () => {
    const result = dataList.filter((item: any) => item.especialidad.toString().toUpperCase().includes(search.toUpperCase()) || item.nombres.toUpperCase().includes(search.toUpperCase()))
    setDataShow(result)
  }

  const saveItems = async () => {
    const items = dataList.filter((item: any) => item.check == true)
    let returnArray: any[] = []
    items.map((item: any) => {
        const _res: any[] = value.filter((element: any) => element.Id_Medico == item.id)
        returnArray = returnArray.concat(_res)
    })
    onSave(returnArray)
  }

  const getAllChecks = (): boolean => {
    const result: any[] = dataList.filter((itm: any) => itm.check == false)
    if(result && result.length && result.length > 0){
        return false
    }
    else{
        return true
    }
  }

  const canSave = (): boolean => {
    const result: any[] = dataList.filter((itm: any) => itm.check == true)
    if(result && result.length && result.length > 0){
        return true
    }
    else{
        return false
    }
  }

  const checkAll = () => {
    const chk = getAllChecks()
    const result = dataList.map((itm: any) => {
        itm.check = !chk
        return itm
    })
    setDataList(result)
    setDataShow(result)
  }

  return (
    <Modal style={{ zIndex: 1050 }} show={ show } onHide={ handleClose } backdrop="static" keyboard={ false }>
        <Modal.Header closeButton>
            <Modal.Title>Seleccionar médicos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="Filtrar registros" onChange={ filterRows } value={ search }/>
                <Button variant="outline-secondary" onClick={ deleteFilter }>
                <FontAwesomeIcon icon={ faTimes } />
                </Button>
            </InputGroup>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th onClick={ checkAll }><FontAwesomeIcon icon={ faCheckCircle } style={{ color: getAllChecks() ? '#008000' : '#CCC' }}/></th>
                    <th>Especialidad</th>
                    <th>Médico</th>
                </tr>
            </thead>
            <tbody>
            {
                dataShow.map((element: any, index: number) =>
                <tr key={ index } onClick={ () => selectColumn(element.id) } style={{ backgroundColor: element.check ? '#DAFFD7' : 'white' }}>
                    <td><FontAwesomeIcon icon={ faCheckCircle } style={{ color: element.check ? '#008000' : '#CCC' }}/></td>
                    <td>{ element.especialidad }</td>
                    <td>{ element.nombres }</td>
                </tr>
                )
            }
            </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={ saveItems } disabled={ !canSave() }>
            Generar
        </Button>{ ' ' }
        <Button variant="danger" onClick={ handleClose }>
            Cancelar
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
