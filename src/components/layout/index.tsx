import * as React from 'react'
import { withRouter } from 'react-router'
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd'
import { auth } from 'utils'
import routes from '../../routes'

const styles = require('./index.scss')
const logo = require('../../assets/logo.svg')

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const content = {
  padding: 24,
  background: '#fff',
  minHeight: 'calc(100vh - 198px)',
}

interface IPage {
  history: any,
  children: any,
  current: string,
  match: Object,
  breadcrumb: any,
  loading: boolean,
}

class Page extends React.Component<IPage, any> {

  state = {
    current: '',
    collapsed: false,
    breadcrumb: [],
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.history.location.pathname,
    })
  }

  handleMenuItemClick = ({ key }) => {
    const { history } = this.props
    this.setState({
      current: key,
    })
    history.push(key)
  }

  // getBreadcrumb = keyPath => keyPath.concat('/|Home').reverse().map(item => {
  //   const [ path, displayName ] = item.split('|')
  //   return { path, displayName }
  // })

  handleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  handleActionClick = ({ key }) => {
    switch (key) {
      case 'logout':
        auth.removeLoginCookie()
        this.props.history.push('/login')
        break
      default:
        break
    }
  }

  render() {
    const { children } = this.props
    const { collapsed, current } = this.state
    const menu = (
      <Menu onClick={this.handleActionClick}>
        <Menu.Item disabled><Icon type="user" /> 个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" /> 设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" /> 退出登陆</Menu.Item>
      </Menu>
    )
    return (
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} trigger={null} collapsible collapsed={collapsed} onCollapse={this.handleCollapse}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
            <h1>Admin</h1>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[current]} onClick={this.handleMenuItemClick}>
            {routes.map((route) => {
              if (route.children.length > 0) {
                return (
                <SubMenu key={`${route.path}`} title={<span><Icon type={route.icon} /><span>{route.displayName}</span></span>}>
                  {route.children.map((sub) => (
                    <Menu.Item key={`${sub.path}`}>
                      <span>{sub.displayName}</span>
                    </Menu.Item>))}
                </SubMenu>)
              }
              return (
                <Menu.Item key={`${route.path}`}>
                  <Icon type={route.icon}/>
                  <span>{route.displayName}</span>
                </Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200, height: '100vh', transition: 'all 0.2s' }}>
          <Header style={{ background: '#fff', padding: 0, height: 60, display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.trigger} onClick={this.handleCollapse}>
              <Icon
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              />
            </div>
            <div className={styles.account}>
              <Dropdown overlay={menu}>
                <span className={styles.action}>
                  <Avatar size="small"icon="user" />
                  用户名
                  <Icon type="down" />
                </span>
              </Dropdown>
            </div>
          </Header>
{/*
          <Breadcrumb style={{ margin: '24px 16px 0', height: 20 }}>
            {breadcrumb && breadcrumb.length > 0 ? breadcrumb.map(item => <Breadcrumb.Item key={item.path}>{item.displayName}</Breadcrumb.Item>) : <Breadcrumb.Item>Home</Breadcrumb.Item>}
          </Breadcrumb>
*/}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={content}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', height: 70 }}>
              created by <Icon type="heart" style={{ color: 'red' }} /> catwen
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Page)
