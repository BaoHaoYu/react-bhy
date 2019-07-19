import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Menu, { ClickParam } from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import * as React from 'react'
import * as NSubMenu from './subMenu.interface'

const { SubMenu, Item } = Menu

class SideSubMenu extends React.Component<NSubMenu.ISideSubMenuProps> {
  // 点击节点
  public onClick = (p: ClickParam) => {
    this.props.onClick && this.props.onClick(p)
  }

  public onOpenChange = (openKeys: string[]) => {
    this.props.onOpenChange && this.props.onOpenChange(openKeys)
  }

  public renderSub = (
    subMenuData: NSubMenu.ISideSubMenuProps['subMenuData'],
  ) => {
    const list: any[] = []
    subMenuData.map((subItem) => {
      // 判断是否有字段children
      if (subItem.children) {
        const title = (
          <span>
            {subItem.icon && <Icon type={subItem.icon} />}
            {subItem.text}
          </span>
        )

        list.push(
          <SubMenu key={subItem.value} title={title}>
            {this.renderSub(subItem.children)}
          </SubMenu>,
        )
      } else {
        list.push(<Item key={subItem.value}>{subItem.text}</Item>)
      }
    })

    return list
  }

  public render() {
    const {
      defaultSelected,
      defaultOpen,
      openKeys,
      selectedKeys,
      subMenuData,
    } = this.props
    return (
      <Menu
        mode={'inline'}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.onClick}
        defaultSelectedKeys={defaultSelected}
        defaultOpenKeys={defaultOpen}
        style={{ borderRight: 0, ...this.props.style }}
      >
        {this.renderSub(subMenuData)}
      </Menu>
    )
  }
}

export default SideSubMenu
