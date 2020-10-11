import { Divider, Card } from 'antd'
import React from 'react'

const gridStyle = {
  textAlign: 'center',
}

const Suggestions = ({ recentSearches }) => {
  return (
    <>
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Recent Searches'
        bordered={false}
      >
        {recentSearches.map((val, i) => (
          <Card.Grid key={i} style={gridStyle}>
            {val}
          </Card.Grid>
        ))}

        {/* <Card.Grid style={gridStyle}>Berlin</Card.Grid>
        <Card.Grid style={gridStyle}>Tokyo</Card.Grid>
        <Card.Grid style={gridStyle}>Bangalore</Card.Grid> */}
      </Card>{' '}
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Popular Cities'
        bordered={false}
      >
        <Card.Grid style={gridStyle}>London</Card.Grid>
        <Card.Grid style={gridStyle}>Berlin</Card.Grid>
        <Card.Grid style={gridStyle}>Tokyo</Card.Grid>
        <Card.Grid style={gridStyle}>Nottingham</Card.Grid>
        <Card.Grid style={gridStyle}>Manchester</Card.Grid>
        <Card.Grid style={gridStyle}>Leeds</Card.Grid>
        <Card.Grid style={gridStyle}>Liverpool</Card.Grid>
        <Card.Grid style={gridStyle}>Sheffield</Card.Grid>
        <Card.Grid style={gridStyle}>Bangalore</Card.Grid>
      </Card>
    </>
  )
}

export default Suggestions
