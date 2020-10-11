import { Divider, Card } from 'antd'
import React from 'react'

const gridStyle = {
  textAlign: 'center',
  cursor: 'pointer',
}

const Suggestions = ({ recentSearches, handleClick }) => {
  return (
    <>
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Recent Searches'
        bordered={false}
      >
        {recentSearches.map((val, i) => (
          <Card.Grid onClick={() => handleClick(val)} key={i} style={gridStyle}>
            {val}
          </Card.Grid>
        ))}
      </Card>{' '}
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Popular Cities'
        bordered={false}
      >
        <Card.Grid onClick={() => handleClick('London')} style={gridStyle}>
          London
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Berlin')} style={gridStyle}>
          Berlin
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Tokyo')} style={gridStyle}>
          Tokyo
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Nottingham')} style={gridStyle}>
          Nottingham
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Manchester')} style={gridStyle}>
          Manchester
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Leeds')} style={gridStyle}>
          Leeds
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Liverpool')} style={gridStyle}>
          Liverpool
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Sheffield')} style={gridStyle}>
          Sheffield
        </Card.Grid>
        <Card.Grid onClick={() => handleClick('Bangalore')} style={gridStyle}>
          Bangalore
        </Card.Grid>
      </Card>
    </>
  )
}

export default Suggestions
