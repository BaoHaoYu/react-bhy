import { ServerState } from './server'
export const foodServer = new ServerState(true, {
  url: '/data/listFood.json',
  baseURL: 'http://localhost:3000',
})
export const peopleServer = new ServerState(true, {
  url: '/data/listPeople.json',
  baseURL: 'http://localhost:3000',
})
export const heheServer = new ServerState(false, {
  url: '/data/listHehe.json',
  baseURL: 'http://localhost:3000',
})
