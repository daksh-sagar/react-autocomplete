import React from 'react'
import { Skeleton, List } from 'antd'

const listData = [
  { name: 'name one', secondary_name: 'something something' },
  { name: 'name one', secondary_name: 'something something' },
  { name: 'name one', secondary_name: 'something something' },
  { name: 'name one', secondary_name: 'something something' },
  { name: 'name one', secondary_name: 'something something' },
]

const Loading = () => {
  return (
    <List
      dataSource={listData}
      bordered
      size='small'
      renderItem={(place) => (
        <List.Item key={place.id}>
          <Skeleton
            title={{ width: '100px' }}
            avatar
            active
            paragraph={{ rows: 1 }}
          ></Skeleton>
        </List.Item>
      )}
    ></List>
  )
}

export default Loading
