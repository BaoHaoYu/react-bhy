import { action } from 'mobx'
import { heheServer } from './deom.state'

export const getHehe = action(() => {
  heheServer.startRequest(null, true)
})

export const deleteHehe = action((index: number) => {
  ;(heheServer.data.data as any[]).splice(index, 1)
})
