import * as NTree from '../index.interface'

export function findCheckededIds(tree: NTree.TreeDataDeal) {
  const ids: string[] = []

  function deep(_tree: NTree.TreeDataDeal) {
    _tree.map((item) => {
      if (item.checked) {
        ids.push(item.id)
      }
      if (item.children) {
        deep(item.children)
      }
    })
  }

  deep(tree)

  return ids
}
