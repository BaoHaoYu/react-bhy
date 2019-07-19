import { ClickParam } from 'antd/lib/menu'
import * as React from 'react'

export interface ISideSubMenuItem {
  /**
   * 图标
   */
  icon?: string
  /**
   * 文字
   */
  text: string
  /**
   * 唯一标识
   */
  value: string
  /**
   * 跳转的链接
   */
  to?: string
  /**
   * 子菜单
   */
  children?: ISideSubMenuItem[]
}

export interface ISideSubMenuProps {
  className?: string
  style?: React.CSSProperties
  /**
   * 数据
   */
  subMenuData: ISideSubMenuItem[]
  /**
   * 默认选中
   */
  defaultSelected?: any[]
  /**
   * 默认打开
   */
  defaultOpen?: any[]
  /**
   * 打开的
   */
  openKeys?: string[]
  /**
   * 选中的
   */
  selectedKeys?: string[]

  /**
   * 打开或者合上菜单
   */
  onOpenChange?(openKeys: string[]): void

  /**
   * 点击节点
   */
  onClick?(p: ClickParam): void
}
