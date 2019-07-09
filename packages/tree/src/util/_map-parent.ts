import { dropRight, get } from 'lodash-es'
import * as TreeNode from '../components/node/index.interface'
import * as Tree from '../index.interface'
import { arrayJoin } from './_index'

/**
 * 遍历父节点
 * @param p
 * @param p.keyPath 原节点的路径
 * @param p.treeData 处理后的嵌套树
 * @param p.setItem(nodeData: TreeNode.ITreeDataItemDidDeal) 相当于 treeData.updateIn(父节点位置,p.setItem)
 * @return {*}
 */
export default function mapParent(p: {
  keyPath: number[]
  treeData: Tree.TreeDataDeal
  setItem: (nodeData: TreeNode.ITreeDataItemDidDeal) => any
}) {
  function deepMapParent(node: { keyPath: number[] }) {
    if (node.keyPath.length > 1) {
      const parentKeyPath: any[] = dropRight(node.keyPath, 1)
      const parent = get(
        p.treeData,
        arrayJoin(parentKeyPath, 'children').join('.'),
      )
      p.setItem(parent)
      deepMapParent({ keyPath: parentKeyPath })
    }
  }

  deepMapParent({ keyPath: p.keyPath })

  return p.treeData
}
