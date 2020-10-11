import { Divider, Card } from 'antd'
import React from 'react'

const gridStyle = {
  textAlign: 'center',
  //   marginBottom: '3%',
}

const Suggestions = () => {
  return (
    <>
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Recent Searches'
        bordered={false}
      >
        <Card.Grid style={gridStyle}>London</Card.Grid>
        <Card.Grid style={gridStyle}>Berlin</Card.Grid>
        <Card.Grid style={gridStyle}>Tokyo</Card.Grid>
        <Card.Grid style={gridStyle}>Bangalore</Card.Grid>
      </Card>{' '}
      <Divider />
      <Card
        headStyle={{ color: '#e8415d' }}
        title='Popular Cities'
        bordered={false}
      >
        <Card.Grid>London</Card.Grid>
        <Card.Grid>Berlin</Card.Grid>
        <Card.Grid>Tokyo</Card.Grid>
        <Card.Grid>Nottingham</Card.Grid>
        <Card.Grid>Manchester</Card.Grid>
        <Card.Grid>Leeds</Card.Grid>
        <Card.Grid>Liverpool</Card.Grid>
        <Card.Grid>Sheffield</Card.Grid>
        <Card.Grid>Bangalore</Card.Grid>
      </Card>
    </>
  )
}

export default Suggestions
