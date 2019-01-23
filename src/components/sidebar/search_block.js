import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchBlock = () => {
  return (
    <div className="search__block">
      <Input
        fluid
        icon='search'
        placeholder='Search contact'
      />
    </div>
  )
}

export default SearchBlock
