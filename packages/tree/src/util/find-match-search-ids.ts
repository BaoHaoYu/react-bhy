import * as NTree from '../index.interface'

export function findMatchSearchIds(tree: NTree.TreeDataDeal) {
  const ids: string[] = []

  function deep(_tree: NTree.TreeDataDeal) {
    return _tree.map((item) => {
      if (item._matchSearch) {
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
