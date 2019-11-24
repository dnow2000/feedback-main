import fetch from 'node-fetch'

import { API_URL } from '../../src/utils/config'

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
