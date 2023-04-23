const response = {
  data: {
    columns: [ // 列定义
      {
        title: 'ID', // 显示在表头的文字
        dataIndex: 'id', // 对应key名
        isSearch: true, // 是否为搜索条件
        sort: true, // 是否可排序
      },
      {
        title: '名称',
        dataIndex: 'name',
        isSearch: false,
        sort: true,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        valueEnum: {
          'male': '男',
          'female': '女'
        },
        isSearch: true,
        searchOptions: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ],
        sort: true,
      },
    ],
    data: [
      {
        id: 1,
        name: '张三',
        sex: 'male',
      },
      {
        id: 2,
        name: '李四',
        sex: 'female'
      }
    ]
  }
}