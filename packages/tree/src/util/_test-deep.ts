/**
 * 深度验证
 * @param deep
 * @param minMoveToDeep
 * @param maxMoveToDeep
 */
export default function testDeep(
  deep: number,
  minMoveToDeep?: number,
  maxMoveToDeep?: number,
): boolean {
  if (minMoveToDeep !== undefined && deep < minMoveToDeep) {
    return false
  }
  if (maxMoveToDeep !== undefined && deep > maxMoveToDeep) {
    return false
  }
  return true
}
