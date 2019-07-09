import * as NNode from '../components/node/index.interface'
import * as NTree from '../index.interface'

export function mapDeepTree(
  treeData: NTree.TreeDataDeal,
  cb: (v: NNode.ITreeDataItemDidDeal) => any = (v) => v,
) {
  return treeData.map((item) => {
    if (item.children) {
      item.children = mapDeepTree(item.children, cb)
    }

    return cb(item)
  })
}
