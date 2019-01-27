import React from 'react'

import Sidebar from '../sidebar/sidebar'
import ContentContainer from '../content/content_container'

const Main = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <ContentContainer />
    </div>
  )
}

export default Main
