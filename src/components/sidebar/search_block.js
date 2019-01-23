import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchBlock = () => {
  return (
    <div className="search_block">
      <Input
        fluid
        icon='users'
        placeholder='Search contact'
      />
    </div>
  )
}

export default SearchBlock
