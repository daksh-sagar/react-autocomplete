import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
  const [state, setState] = useState({
    searchTerm: '',
    results: [],
    show: 'neither',
    requestCount: 0,
  })

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

      const delay = setTimeout(() => {
        setState((state) => ({
          ...state,
          requestCount: state.requestCount + 1,
        }))
      }, 1000)

      return () => clearTimeout(delay)
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
    <div className='search-overlay'>
      <div className='search-overlay-top shadow-sm'>
        <div className='container container--narrow'>
          <label htmlFor='live-search-field' className='search-overlay-icon'>
            <i className='fas fa-search'></i>
          </label>
          <input
            autoFocus
            type='text'
            autoComplete='off'
            id='live-search-field'
            className='live-search-field'
            placeholder='What are you interested in?'
            onChange={handleInput}
          />
        </div>
      </div>

      <div className='search-overlay-bottom'>
        <div className='container container--narrow py-3'>
          <div className='list-group shadow-sm'>
            {state.show === 'neither' ? (
              <div>SHOW ALL SORTS OF RUBBISH</div>
            ) : state.show === 'loading' ? (
              <div>Loading Results...</div>
            ) : (
              <>
                <div className='list-group-item active'>
                  <strong>Search Results</strong> {state.results.length} items
                  found
                </div>
                <ul>
                  {state.results.map((place) => (
                    <li key={place.id}>
                      {place.name}
                      {place.region_type}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
