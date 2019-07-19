import { isArray } from 'lodash-es'
import pathToRegexp from 'path-to-regexp'
import { ISideDataItem } from '../index.interface'

// 递归查找高亮的节点，从而卡开父节点
export function setOpened(p: {
  sideData: ISideDataItem[]
  activeValue: string
}) {
  const opented: any[] = []

  function _setOpened(_p: {
    sideData: ISideDataItem[]
    activeValue: string
  }): boolean {
    for (const item of _p.sideData) {
      if (!item.hasOwnProperty('children') && item.value === _p.activeValue) {
        return true
      }
      if (item.hasOwnProperty('children')) {
        // 如果找到了，封装到opented
        const find = _setOpened({
          sideData: item.children || [],
          activeValue: _p.activeValue,
        })
        if (find) {
          opented.push(item.value)
        }
      }
    }
    return false
  }

  _setOpened(p)
  return opented
}

/**
 * 深度递归遍历数据
 */
function deepSideData(p: {
  sideData: ISideDataItem[]
  getSideDataItem: (v: { sideDataItem: ISideDataItem }) => any
}) {
  for (const item of p.sideData) {
    p.getSideDataItem({ sideDataItem: item })
    if (item.hasOwnProperty('children')) {
      deepSideData({
        sideData: item.children || [],
        getSideDataItem: p.getSideDataItem,
      })
    }
  }
}

/**
 * 遍历验证
 * @returns {boolean}
 */
function testPaths(p: { routePath: string[]; hashUrl: string }): boolean {
  for (const path of p.routePath) {
    if (pathToRegexp(path).test(p.hashUrl)) {
      return true
    }
  }
  return false
}

/**
 * 封装数据
 */
export function maps(p: { sideData: ISideDataItem[] }) {
  const hashUrl = location.hash.replace('#', '')
  const selected: any[] = []
  deepSideData({
    sideData: p.sideData,
    getSideDataItem: ({ sideDataItem }) => {
      if (!sideDataItem.hasOwnProperty('children')) {
        // 如果是数组，遍历验证
        if (isArray(sideDataItem.routePath)) {
          if (testPaths({ routePath: sideDataItem.routePath, hashUrl })) {
            selected.push(sideDataItem.value)
          }
        } else if (pathToRegexp(sideDataItem.routePath!).test(hashUrl)) {
          selected.push(sideDataItem.value)
        }
      }
    },
  })
  const opented = setOpened({ sideData: p.sideData, activeValue: selected[0] })
  return {
    opented,
    selected,
    sideData: p.sideData,
  }
}
