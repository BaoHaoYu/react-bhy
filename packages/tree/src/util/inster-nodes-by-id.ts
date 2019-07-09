import * as NTree from '../index.interface'

export function insterNodesById(
  tree: NTree.TreeData,
  nodes: NTree.TreeData,
  id?: string,
) {
  if (id === undefined) {
    return [...tree, ...nodes]
  }

  let hasFind = false

  function deep(_tree: NTree.TreeData) {
    return _tree.map((item, i) => {
      if (id === item.id) {
        if (item.children) {
          item.children.splice(i, 0, ...nodes)
          hasFind = true
        }
      }
      if (item.children && !hasFind) {
        item.children = deep(item.children)
      }
      return item
    })
  }

  return deep(tree)
}
