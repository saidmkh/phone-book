import React from 'react'

import SearchBlock from './search_block'
import ContactList from './contact_list'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchBlock />
      <ContactList />
    </div>
  )
}

export default Sidebar
