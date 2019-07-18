import { ClickParam } from 'antd/lib/menu'
import { ISideSubMenuProps } from './components/menus/subMenu.interface'

/**
 * 封装侧边栏
 */
export interface ISideUrlProps extends Omit<ISideSubMenuProps, 'subMenuData'> {
  /**
   * 侧边栏数据
   */
  sideData: ISideDataItem[]

  /**
   * 只允许根部一个节点展开
   */
  onlyOneRootOpen?: boolean

  className?: string

  style?: React.CSSProperties

  /**
   * 点击菜单
   */
  onClick?(p: ClickParam): void

  /**
   * 展开
   */
  onOpenChange?(openKeys: string[]): void
}

export interface ISideDataItem {
  /**
   * 文字
   */
  text: string
  /**
   * 唯一标识（建议使用路由地址）
   */
  value: string
  /**
   * 如果链接匹配该路由，则会高亮该菜单
   */
  routePath?: string
  /**
   * 子菜单
   */
  children?: ISideDataItem[]
}

export interface IState {
  openKeys?: string[]
}

export { ClickParam }
