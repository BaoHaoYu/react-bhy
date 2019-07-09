import * as NNode from '../components/node/index.interface'
import * as NTree from '../index.interface'
import { addBaseInfo, mapParent } from './_index'
export function openSeletedNodes(tree: NTree.TreeData) {
  function deep(_tree: NTree.TreeData) {
    return _tree.map((item, i) => {
      if (item.selected) {
        mapParent(item as NNode.ITreeDataItemDidDeal, (parent) => {
          parent.open = true
          return parent
        })
      }
      if (item.children) {
        deep(item.children)
      }
      return item
    })
  }

  return deep(addBaseInfo(tree as NTree.TreeDataDeal, []))
}
