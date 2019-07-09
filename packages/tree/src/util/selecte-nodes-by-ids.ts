import { find, remove } from 'lodash-es'
import * as NTree from '../index.interface'
export function selecteNodesByIds(tree: NTree.TreeData, ids: string[]) {
  function deep(_tree: NTree.TreeData) {
    return _tree.map((item) => {
      if (find(ids, item.id)) {
        item.selected = true
        remove(ids, item.id)
      }
      if (item.children && ids.length !== 0) {
        deep(item.children)
      }
      return item
    })
  }

  return deep(tree)
}
