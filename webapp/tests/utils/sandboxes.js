import fetch from 'node-fetch'

const { API_URL } = process.env

export async function fetchSandbox(getterName) {
  const path = `${API_URL}/sandboxes/${getterName}`
  const result = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:3001',
    },
  })

  const obj = await result.json()

  return obj
}
