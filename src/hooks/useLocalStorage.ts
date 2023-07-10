export const useLocalStorage = () => {

  const keySidebar = '0ALVWOLTZt8wiA3tccEh'
  const keySession = 'Nxe4XmCpiWH9xP8bJoZ9'
  const keyData = 'sFr37ht5F7ksaf8h5Ht62D'

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, window.btoa(JSON.stringify(value)))
  }

  const getItem = (key: string) => {
    const value = localStorage.getItem(key)
    if(value && value != ''){
      return JSON.parse(window.atob(value) || '{}')
    }
    return JSON.parse(value || '{}')
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
  }

  return { setItem, getItem, removeItem, keySidebar, keySession, keyData }
}