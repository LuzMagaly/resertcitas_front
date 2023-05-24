export const useLocalStorage = () => {

  const keySidebar = '0ALVWOLTZt8wiA3tccEh'
  const keySession = 'Nxe4XmCpiWH9xP8bJoZ9'

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, window.btoa(JSON.stringify(value)))
  }

  const getItem = (key: string) => {
    const value = localStorage.getItem(key)
    console.log(value)
    if(value && value != ''){
      return JSON.parse(window.atob(value) || '{}')
    }
    return JSON.parse(value || '{}')
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
  }

  return { setItem, getItem, removeItem, keySidebar, keySession }
}