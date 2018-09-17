export function save(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function load(name) {
  const dataString = localStorage.getItem(name)
  try {
    return JSON.parse(dataString)
  } catch (err) {
    return { err }
  }
}
