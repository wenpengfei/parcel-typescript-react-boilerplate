import * as React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Table, Divider, Popconfirm, message } from 'antd'
import { MemberStore } from 'stores'

interface IMemberListTable {
  memberStore?: MemberStore,
  history?: any,
  onEdit?: (row: any) => void,
}

@inject('memberStore')
@observer
class MemberListTable extends React.Component<IMemberListTable, any> {
  componentDidMount() {
    this.props.memberStore.getPageList({ pageIndex: 1 })
  }

  handlePageChange = (pageIndex, pageSize) => {
    this.props.memberStore.getPageList({ pageIndex, pageSize })
  }

  handleEdit = (row) => {
    this.props.onEdit(row)
  }

  handleDelete = (form) => {
    try {
      this.props.memberStore.remove(form._id)
      message.success('删除成功')
    } catch (error) {
      message.error(error)
    }
  }

  bindRowkey = (row) => row._id

  render() {
    const { list, loading, totalCount, pageIndex, pageSize } = this.props.memberStore
    const pagination = {
      onChange: this.handlePageChange,
      onShowSizeChange: this.handlePageChange,
      total: totalCount,
      current: pageIndex,
      showSizeChanger: true,
      pageSize,
    }
    const columns = [{
      title: '用户名',
      dataIndex: 'memberName',
      key: 'memberName',
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    }, {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popconfirm title="操作不可逆，确认删除?" onConfirm={this.handleDelete.bind(this, record)} okType="danger" okText="确认" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={this.handleEdit.bind(this, record)}>编辑</a>
        </span>
      ),
    }]

    return (
      <div>
        <Table
          pagination={pagination}
          rowKey={this.bindRowkey}
          columns={columns}
          loading={loading}
          dataSource={toJS(list)}
        />
      </div>)
  }
}

export default MemberListTable
