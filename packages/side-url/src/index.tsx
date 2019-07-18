import { defaultTo, find, last, xor } from 'lodash-es'
import * as React from 'react'
import SubMenu from './components/menus/subMenu'
import * as NSide from './index.interface'
import { maps } from './util'

export default class SideUrl extends React.Component<NSide.ISideUrlProps> {
  public static defaultProps: Partial<NSide.ISideUrlProps>

  public state: NSide.IState = {
    openKeys: undefined,
  }

  public onClick = (p: NSide.ClickParam) => {
    this.props.onClick && this.props.onClick(p)
  }

  public onOpenChange = (openKeys: any[]) => {
    const newValue = last(openKeys)
    const rootValues: any[] = []
    this.props.sideData.map((item) => {
      rootValues.push(item.value)
    })
    if (this.props.onlyOneRootOpen) {
      const findRootValue = find(
        rootValues,
        (rootValue) => rootValue === newValue,
      )
      // 如果操作的节点是根部节点，并且是展开操作，删除之前root节点value
      if (findRootValue) {
        openKeys = xor(rootValues, openKeys, rootValues).concat([newValue])
      }
    }
    this.state.openKeys = openKeys
    this.setState(this.state)

    this.props.onOpenChange && this.props.onOpenChange(openKeys)
  }

  public render() {
    const info = maps({ sideData: this.props.sideData })
    return (
      <SubMenu
        className={this.props.className}
        style={this.props.style}
        onOpenChange={this.onOpenChange}
        onClick={this.onClick}
        selectedKeys={info.selected}
        openKeys={defaultTo(this.state.openKeys, info.opented)}
        subMenuData={this.props.sideData}
      />
    )
  }
}

SideUrl.defaultProps = {
  sideData: [],
  defaultSelected: [],
  defaultOpen: [],
  onlyOneRootOpen: true,
}

export { NSide }
