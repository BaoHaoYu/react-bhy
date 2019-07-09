import * as NTree from '../index.interface'

export function findOpenIds(tree: NTree.TreeDataDeal) {
  const ids: string[] = []

  function deep(_tree: NTree.TreeDataDeal) {
    return _tree.map((item) => {
      if (item.open) {
        ids.push(item.id)
      }
      if (item.children) {
        deep(item.children)
      }
      return item
    })
  }

  deep(tree)

  return ids
}
