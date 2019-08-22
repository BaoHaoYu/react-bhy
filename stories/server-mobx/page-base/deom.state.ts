import { ServerState } from '../../../packages/server-mobx/src'
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

export const errorServer = new ServerState({
  url: '/data/hasError.json',
  baseURL: 'http://localhost:3000',
})
