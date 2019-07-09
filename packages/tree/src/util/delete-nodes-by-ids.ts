import { dropWhile, filter, find } from 'lodash-es'
import * as NTree from '../index.interface'

export function deleteNodesByIds(tree: NTree.TreeData, ids: string[]) {
  let _ids = [...ids]
  function deep(childrenList: NTree.TreeData) {
    const needDelete: any = []
    for (const item of childrenList) {
      if (find(_ids, (id) => item.id === id) !== undefined) {
        needDelete.push(item)
        _ids = filter(_ids, (id) => item.id !== id)
      } else if (item.children && _ids.length > 0) {
        item.children = deep(item.children)
      }
    }

    return dropWhile(childrenList, (item) => {
      return find(needDelete, (needDeleteItem) => needDeleteItem.id === item.id)
    })
  }

  return deep(tree)
}
