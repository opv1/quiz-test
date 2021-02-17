export const useStorage = () => {
  const setItem = (name, item) => {
    return localStorage.setItem(`${name}`, JSON.stringify(item))
  }

  const getItem = (name) => {
    return JSON.parse(localStorage.getItem(`${name}`))
  }

  return { setItem, getItem }
}
