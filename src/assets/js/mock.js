// 引入mockjs
import Mock from 'mockjs';

// 延时200-600毫秒请求到数据
Mock.setup({
  timeout: '200-600'
});

// 使用mockjs模拟器
Mock.mock('/login/toLogin', {
  'data': {
    'token|5': '@string'
  }
});

Mock.mock('/api/todolist/todo', {
  'data': [{
    'id|5': '@string',
    'time': '@datetime',
    'subject': 'aaaaa'
  },
  {
    'id|5': '@string',
    'time': '@datetime',
    'subject': 'bbb'
  }
  ]
});

Mock.mock('/api/todolist/unread', {
  'data': [{
    'id|5': '@string',
    'time': '@datetime',
    'subject': 'aaaaa'
  },
  {
    'id|5': '@string',
    'time': '@datetime',
    'subject': 'bbb'
  },
  {
    'id|5': '@string',
    'time': '@datetime',
    'subject': 'ccc'
  }
  ]
});
