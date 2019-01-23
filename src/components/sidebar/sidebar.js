import React from 'react'

import SidebarHead from './sidebar_head'
import ContactList from './contact_list'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarHead />
      <ContactList />
    </div>
  )
}

export default Sidebar
