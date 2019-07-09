/**
 * sourceKeyPath 是否是targetKeyPath 的父目录
 * 如 [1] 是 [1,'children',2] 的父目录
 * @param sourceKeyPath
 * @param targetKeyPath
 */
export default function testParent(
  sourceKeyPath: number[],
  targetKeyPath: number[],
): boolean {
  return targetKeyPath.join('_').indexOf(sourceKeyPath.join('_')) === 0
}
