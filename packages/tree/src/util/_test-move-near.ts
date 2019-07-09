import { dropRight, isEqual, last } from 'lodash-es'

/**
 * 设置箭头，鼠标拖动节点在dir箭头区域上移动，判断是否符合移动约束
 * @param move
 * @property move.sourceKeyPath
 * @property move.targetKeyPath
 * @property move.dir
 */
export default function testMoveNear(move: {
  sourceKeyPath: any[]
  targetKeyPath: any[]
  dir: string
}): boolean {
  // 判断是否同级
  if (isEqual(dropRight(move.sourceKeyPath), dropRight(move.targetKeyPath))) {
    const sourceIndex: number = last(move.sourceKeyPath)
    const targetIndex: number = last(move.targetKeyPath)
    // 移动到上面一个节点的下边，顺序不变
    if (
      sourceIndex > targetIndex &&
      sourceIndex - targetIndex === 1 &&
      move.dir === 'bottom'
    ) {
      return false
    }
    // 移动到下面一个节点的上边，顺序不变
    if (
      sourceIndex < targetIndex &&
      targetIndex - sourceIndex === 1 &&
      move.dir === 'top'
    ) {
      return false
    }
    return true
  }
  return true
}
