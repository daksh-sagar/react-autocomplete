import React, { useState, useEffect } from 'react'
import { Input, List, Avatar, Typography } from 'antd'
import axios from 'axios'
import Loading from './Loading'

const { Search } = Input
const { Text } = Typography

const SearchComponent = () => {
  const [state, setState] = useState({
    searchTerm: '',
    results: [],
    show: 'neither',
    requestCount: 0,
  })

  const [showTip, setShowTip] = useState(true)

  const handleInput = (e) => {
    const value = e.target.value
    setState((state) => ({ ...state, searchTerm: value }))
  }

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState((state) => ({
        ...state,
        show: 'loading',
      }))

      if (state.searchTerm.trim().length < 3) {
        setShowTip(true)
      } else {
        setShowTip(false)
        const delay = setTimeout(() => {
          setState((state) => ({
            ...state,
            requestCount: state.requestCount + 1,
          }))
        }, 1000)

        return () => clearTimeout(delay)
      }
    } else {
      setState((state) => ({
        ...state,
        show: 'neither',
      }))
    }
  }, [state.searchTerm, setState])

  useEffect(() => {
    if (state.requestCount) {
      const request = axios.CancelToken.source()

      async function fetchResults() {
        try {
          const response = await axios.get(
            'https://base.amberstudent.com/api/v0/regions',
            {
              params: {
                sort_key: 'search_name',
                sort_order: 'desc',
                states: 'active',
                limit: 5,
                search_name: state.searchTerm,
              },
            }
          )
          setState((state) => ({
            ...state,
            results: response.data.data.result,
            show: 'results',
          }))
        } catch (error) {
          console.log(JSON.stringify(error))
        }
      }

      fetchResults()

      return () => request.cancel()
    }
  }, [state.requestCount])

  return (
    <div className='search'>
      <Search
        placeholder='Search by College or City'
        onChange={handleInput}
        enterButton
        size='large'
      />
      <div>
        {state.show === 'neither' ? (
          <div>SHOW ALL SORTS OF RUBBISH</div>
        ) : state.show === 'loading' ? (
          <Loading
            showTip={showTip}
            searchTermLength={state.searchTerm.trim().length}
          />
        ) : (
          <>
            <List
              bordered
              dataSource={state.results}
              size='default'
              renderItem={(place) => (
                <List.Item key={place.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src='https://icons-for-free.com/iconfiles/png/512/marker+navigation+place+icon-1320196453703105111.png'
                        size='small'
                      />
                    }
                    title={<Text type='danger'>{place.name}</Text>}
                    description={place.secondary_name}
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default SearchComponent
