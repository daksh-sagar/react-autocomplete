import { Divider, Card } from 'antd'
import React from 'react'

const gridStyle = {
  textAlign: 'center',
}

const Suggestions = ({ recentSearches, handleChange }) => {
  return (
    <>
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Recent Searches'
        bordered={false}
      >
        {recentSearches.map((val, i) => (
          <Card.Grid
            onClick={() => handleChange(val)}
            key={i}
            style={gridStyle}
          >
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
        <Card.Grid onClick={() => handleChange('London')} style={gridStyle}>
          London
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Berlin')} style={gridStyle}>
          Berlin
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Tokyo')} style={gridStyle}>
          Tokyo
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Nottingham')} style={gridStyle}>
          Nottingham
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Manchester')} style={gridStyle}>
          Manchester
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Leeds')} style={gridStyle}>
          Leeds
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Liverpool')} style={gridStyle}>
          Liverpool
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Sheffield')} style={gridStyle}>
          Sheffield
        </Card.Grid>
        <Card.Grid onClick={() => handleChange('Bangalore')} style={gridStyle}>
          Bangalore
        </Card.Grid>
      </Card>
    </>
  )
}

export default Suggestions
