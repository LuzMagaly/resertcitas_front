import { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

interface IDataContext {
  data: any | null
  setData: Dispatch<SetStateAction<any | null>>
}
//funcmodifi
export const DataContext = createContext<IDataContext>({
  data: null,
  setData: () => {}
})

export const DataProvider = ({ children }: { children: any }) => {
  const { getItem, keyData } = useLocalStorage()
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    const _data = (getItem(keyData))
    if(_data){
      setData(_data)
    }
  }, [])

//secreahijos
  return (
    <DataContext.Provider value={{ data, setData }}>
        { children }
    </DataContext.Provider>
  )
}
