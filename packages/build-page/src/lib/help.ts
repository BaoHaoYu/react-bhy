/**
 * 生产wigets函数的type
 * @param {string} type
 * @param {string[]} hashList
 */
export function buildWidgetType(type: string, ...hashList: string[]) {
  hashList.map((hash: string, index) => {
    if (index === 0) {
      type = '@@_' + type + '_._' + hash
    } else {
      type = type + '_.' + hash
    }
  })
  return type
}

/**
 * 统一规划，生成meta
 * @param {string} where 来自哪里
 * @param {string} use 做什么用的
 */
export function buildMeta(where: string = '', use: string) {
  return `from：${where} -> effect：${use}`
}

/**
 * 把带有_keyPath的immutable数据去掉_keyPath
 * @param data 带有_keyPath的immutable数据
 */
export function toMap(data: any) {
  if (data === null && data === undefined) {
    return data
  }

  if (data.hasOwnProperty('_keyPath')) {
    return data._rootData.getIn(data._keyPath)
  }

  return data
}
