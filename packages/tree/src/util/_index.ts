import { defaultTo, map } from 'lodash-es'
import * as NNode from '../components/node/index.interface'
import * as NTree from '../index.interface'

export interface IMapParent {
  _keyPath: any[]
  treeData: NTree.TreeDataDeal
  setItem: any
  goParent: any
}

/**
 * 添加 keyPath, parentNode
 * @param tree tree的数据
 * @param keyPath 父节点的路径
 * @param parent 父节点
 * @returns {NTree.TreeDataDeal} 添加信息后的tree数据
 */
export function addBaseInfo(
  tree: NTree.TreeDataDeal,
  keyPath: number[],
  parent?: NNode.ITreeDataItemDidDeal,
): NTree.TreeDataDeal {
  return tree.map((item, i) => {
    item.keyPath = [...keyPath, i]
    if (parent) {
      item.parentNode = parent
    }
    if (item.children) {
      item.children = addBaseInfo(item.children, item.keyPath, item)
    }
    return item
  })
}

/**
 * 递归遍历勾选子节点
 * @param tree tree的数据
 * @param checked 所有子节点要设置成的值
 * @returns {NTree.TreeDataDeal} 该节点的所有子节点
 */
export function checkChildren(
  tree: NTree.TreeDataDeal,
  checked: boolean,
  isSearching: boolean,
): NTree.TreeDataDeal {
  if (tree) {
    return tree.map((item, i) => {
      if (isSearching) {
        if (item._matchSearch) {
          item.checked = checked
        }
      } else {
        item.checked = checked
      }

      if (item.checked) {
        item.halfChecked = false
      }
      if (item.children) {
        item.children = checkChildren(item.children, checked, isSearching)
      }
      return item
    })
  }
  return tree
}

/**
 * 子节点的勾选状态
 * @param tree
 */
function checkedState(tree: NTree.TreeDataDeal) {
  let checked: boolean = true
  let halfChecked: boolean = false
  let notAnyChecked: boolean = true
  function deep(_tree: NTree.TreeDataDeal) {
    for (const item of _tree) {
      if (!item.checked) {
        checked = false
      }

      if (item.checked) {
        notAnyChecked = false
      }
      if (item.children) {
        deep(item.children)
      }
    }

    if (!notAnyChecked && !checked) {
      halfChecked = true
    }
  }

  deep(tree)

  return {
    notAnyChecked,
    halfChecked,
    checked,
  }
}

/**
 * 遍历父节点
 * @param item
 * @param cb 修改父节点的方法
 */
export function mapParent(
  item: NNode.ITreeDataItemDidDeal,
  cb: (parent: NNode.ITreeDataItemDidDeal) => NNode.ITreeDataItemDidDeal = (
    parent: NNode.ITreeDataItemDidDeal,
  ) => parent,
) {
  if (item && item.parentNode) {
    item.parentNode = cb(item.parentNode)
    mapParent(item.parentNode, cb)
  }
}

/**
 * 勾线父节点，及其父节点的其他子节点
 * @param item
 * @param checked
 */
export function checkParent(item: NNode.ITreeDataItemDidDeal) {
  // 遍历父节点
  mapParent(item, (parent: NNode.ITreeDataItemDidDeal) => {
    // 兄弟节点是否全勾上
    const state = checkedState(parent.children!)
    parent.checked = state.checked
    parent.halfChecked = state.halfChecked
    return parent
  })
}

/**
 * 勾选自身
 * @param item
 * @param checked
 */
export function checkSelf(item: NNode.ITreeDataItemDidDeal, checked: boolean) {
  function deep(tree: NTree.TreeDataDeal = []) {
    tree.map((node) => {
      if (!node._matchSearch) {
        item.halfChecked = true
      } else if (node.children) {
        deep(node.children)
      }
    })
  }

  if (item._matchSearch) {
    deep(item.children as NTree.TreeDataDeal)

    if (!item.halfChecked) {
      item.checked = checked
    }
  } else {
    item.checked = checked
    if (item.halfChecked) {
      item.checked = true
      item.halfChecked = false
    } else if (!checked) {
      item.halfChecked = false
    }
  }
}

/**
 * 总体逻辑
 * @param p
 */
export function addInfo(tree: NTree.TreeDataDeal) {
  const newTreeData = addBaseInfo(tree, [])
  return newTreeData
}

/**
 * 搜索树
 * @param tree
 * @param search
 */
export function searchTree(tree: NTree.TreeDataDeal, search: string) {
  return tree.map((item) => {
    if (item.title.indexOf(search) !== -1) {
      item._matchSearch = true
      mapParent(item, (parent) => {
        parent.open = true
        parent._matchSearch = true
        return parent
      })
    } else {
      item._matchSearch = false
    }

    if (item.children) {
      item.children = searchTree(item.children, search)
    }

    return item
  })
}

/**
 * 整个树转化为simpleTee，即可视化数据
 */
export function changeWholeTreeToSimpleTree(p: {
  treeData: NTree.TreeDataDeal
  isSearching: boolean
  openMatchSerchParents: boolean
}) {
  const newTreeData: NTree.TreeDataSimple = []

  function deepChildren(_p: { treeData: NTree.TreeDataDeal }) {
    _p.treeData.map((item) => {
      if (!p.isSearching) {
        newTreeData.push(item)
        if (item.children && item.open) {
          deepChildren({
            treeData: item.children,
          })
        }
      } else if (item._matchSearch) {
        newTreeData.push(item)
        if (item.open && item.children) {
          deepChildren({
            treeData: item.children,
          })
        }
      }
    })
  }

  deepChildren({ treeData: p.treeData })

  return newTreeData
}

/**
 * 合并数据
 */
export function mergaData(
  tree: NTree.TreeDataDeal,
  data: Partial<NNode.INodeData>,
) {
  return tree.map((item) => {
    map(data, (value, key) => {
      item[key] = value
    })
    if (item.children) {
      item.children = mergaData(item.children, data)
    }
    return item
  })
}

/**
 * 数组 ['a','b','c'] 变成 ['a',value,'b',value,'c',value]
 * @param  array 数组
 * @param value 需要插入的值
 * @return {Array} 插入值后的数组
 */
export function arrayJoin(array: any[], value?: any): any[] {
  const _value = defaultTo(value, 'children')
  const length = array.length
  const list: any[] = []
  if (length === 1 || length === 0) {
    return array
  }
  for (let i = 0; i < array.length; i++) {
    const v = array[i]
    if (i !== length - 1) {
      list.push(v)
      list.push(_value)
    } else {
      list.push(v)
    }
  }

  return list
}
