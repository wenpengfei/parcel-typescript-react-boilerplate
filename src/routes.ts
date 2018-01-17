const routes = [
  {
    path: '/member',
    name: 'member',
    icon: 'user',
    displayName: '会员',
    children: [
      {
        path: '/member/list',
        name: 'member.list',
        displayName: '会员列表',
      },
      {
        path: '/member/add',
        name: 'member.add',
        displayName: '新增会员',
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    icon: 'smile-o',
    displayName: '用户',
    children: [
      {
        path: '/user/list',
        name: 'user.list',
        displayName: '用户列表',
      },
      {
        path: '/user/add',
        name: 'user.add',
        displayName: '新增用户',
      },
    ],
  },
]

export default routes
