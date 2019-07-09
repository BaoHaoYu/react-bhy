import * as NTree from '../index.interface'

export function apendNodesById(
  tree: NTree.TreeData,
  nodes: NTree.TreeData,
  id?: string,
) {
  if (id === undefined) {
    return [...tree, ...nodes]
  }
  function deep(_tree: NTree.TreeData) {
    return _tree.map((item) => {
      if (id === item.id) {
        if (item.children) {
          item.children = [...item.children, ...nodes]
        }
      }
      if (item.children) {
        item.children = deep(item.children)
      }
      return item
    })
  }

  return deep(tree)
}
