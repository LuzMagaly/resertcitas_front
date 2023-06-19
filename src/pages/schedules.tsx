import { Button, Container, Form } from "react-bootstrap"
import TitleCard from "./cards/titleCard"
import ColumnCard from "./cards/columnCard"
import ContentCard from "./cards/contentCard"
import { useEffect, useState } from "react"

const Schedules = () => {

  const daysWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
  const standarHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  const [selectedHours, setSelectedHours] = useState<any[]>([])

  const data = [
    {
        "hora": "08:00",
        "dia": "Lunes"
    },
    {
        "hora": "09:00",
        "dia": "Lunes"
    },
    {
        "hora": "10:00",
        "dia": "Lunes"
    },
    {
        "hora": "11:00",
        "dia": "Lunes"
    },
    {
        "hora": "12:00",
        "dia": "Lunes"
    },
    {
        "hora": "14:00",
        "dia": "Martes"
    },
    {
        "hora": "15:00",
        "dia": "Martes"
    },
    {
        "hora": "16:00",
        "dia": "Martes"
    },
    {
        "hora": "17:00",
        "dia": "Martes"
    },
    {
        "hora": "18:00",
        "dia": "Martes"
    },
    {
        "hora": "08:00",
        "dia": "Miercoles"
    },
    {
        "hora": "09:00",
        "dia": "Miercoles"
    },
    {
        "hora": "10:00",
        "dia": "Miercoles"
    },
    {
        "hora": "11:00",
        "dia": "Miercoles"
    },
    {
        "hora": "12:00",
        "dia": "Miercoles"
    },
    {
        "hora": "08:00",
        "dia": "Jueves"
    },
    {
        "hora": "09:00",
        "dia": "Jueves"
    },
    {
        "hora": "10:00",
        "dia": "Jueves"
    },
    {
        "hora": "11:00",
        "dia": "Jueves"
    },
    {
        "hora": "12:00",
        "dia": "Jueves"
    },
    {
        "hora": "14:00",
        "dia": "Viernes"
    },
    {
        "hora": "15:00",
        "dia": "Viernes"
    },
    {
        "hora": "16:00",
        "dia": "Viernes"
    },
    {
        "hora": "17:00",
        "dia": "Viernes"
    },
    {
        "hora": "18:00",
        "dia": "Viernes"
    },
    {
        "hora": "19:00",
        "dia": "Sabado"
    },
    {
        "hora": "20:00",
        "dia": "Sabado"
    },
    {
        "hora": "19:00",
        "dia": "Domingo"
    },
    {
        "hora": "20:00",
        "dia": "Domingo"
    }
]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    if(!data){
      return
    }
    const hoursPerDays: any[] = []
    daysWeek.map((day: string) => {
      const newArray = data.filter((di) => di.dia == day)
      hoursPerDays.push(newArray)
    })
    setSelectedHours(data)
  }

  const selectHour = (item: string, element: string) => {
    let existsHours = selectedHours
    const exists = existsHours.findIndex((_) => _.hora == item && _.dia == element)
    if(exists == -1){
      const value = {
        hora: item,
        dia: element
      }
      existsHours.push(value)
    }
    else{
      existsHours.splice(exists, 1)
    }
    setSelectedHours(existsHours)
  }

  const getSelected = (hora: string, dia: string) => {
    const result = selectedHours.find((item: any) => item.dia == dia && item.hora == hora)
    return result? true: false
  }

  const saveRows = () => {
  }

  return (
    <Container>
      <div className="p-3 m-0" style={{ width: '500px' }}>
        <Form.Select>
          <option>Seleccionar consultorio</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
      <Button onClick={ saveRows }>Guardar</Button>
      <div className="d-flex flex-row">
        <div className="p-0 m-1" style={{ width: '15rem' }}></div>
        {
          daysWeek.map((day: any, index: number) =>
            <TitleCard key={ index } title={ day }/>
          )
        }
      </div>
        {
          standarHours.map((item: any, index: number) =>
            <div  key={ index } className="d-flex flex-row">
              <ColumnCard hour={ item }/>
              {
                daysWeek.map((element: any, index: number) =>
                  <ContentCard key={ index } onClick={ () => selectHour(item, element) } selected={ getSelected(item, element) }/>
                )
              }
            </div>
          )
        }
    </Container>
  )
}

export default Schedules