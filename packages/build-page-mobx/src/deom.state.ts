import { ServerState } from './server'
export const foodServer = new ServerState({
  url: '/data/listFood.json',
  baseURL: 'http://localhost:3000',
})

export const peopleServer = new ServerState({
  url: '/data/listPeople.json',
  baseURL: 'http://localhost:3000',
})

export const heheServer = new ServerState({
  url: '/data/listHehe.json',
  baseURL: 'http://localhost:3000',
})
