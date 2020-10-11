import React, { useState, useEffect } from 'react'
import { Input, List, Avatar, Typography } from 'antd'
import axios from 'axios'
import Loading from './Loading'
import Suggestions from './Suggestions'

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
  const [recentSearches, setRecentSearches] = useState([
    'London',
    'Liverpool',
    'Bangalore',
    'Leeds',
  ])

  // handle search input change
  const handleInput = (e) => {
    const value = e.target.value
    setState((state) => ({ ...state, searchTerm: value }))
  }

  const handleClick = (val) => {
    setState({
      ...state,
      searchTerm: val,
    })
  }

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState((state) => ({
        ...state,
        show: 'loading',
      }))

      // If length of search term < 3 update the flag to show appropriate tip to the user
      if (state.searchTerm.trim().length < 3) {
        setShowTip(true)
      } else {
        setShowTip(false)
        const delay = setTimeout(() => {
          setState((state) => ({
            ...state,
            requestCount: state.requestCount + 1,
          }))
        }, 1000) // Update count 1 second after the user has stopped typing in the search box, to prevent unnecessary api calls.

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

      // fetchResults fetches the search results from the api and populates app state
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
                search_name: state.searchTerm.trim(),
              },
            }
          )
          setState((state) => ({
            ...state,
            results: response.data.data.result,
            show: 'results',
          }))

          // Update recentSearches array with the most recent search query
          setRecentSearches((recentSearches) => {
            const searches = [...recentSearches]
            searches.pop()

            const s = state.searchTerm.trim()
            searches.unshift(s.charAt(0).toUpperCase() + s.slice(1))
            return searches
          })
        } catch (error) {
          console.log(JSON.stringify(error))
        }
      }

      fetchResults()

      return () => request.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.requestCount])

  return (
    <div className='search'>
      <Search
        autoFocus
        value={state.searchTerm}
        placeholder='Search by College or City'
        onChange={handleInput}
        enterButton='Search'
        size='large'
      />
      <div>
        {state.show === 'neither' ? (
          <Suggestions
            recentSearches={recentSearches}
            handleClick={handleClick}
          />
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
