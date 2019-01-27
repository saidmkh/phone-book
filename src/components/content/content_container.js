import React from 'react'

import Content from './content'
import BurgerToggle from './burger_toggle'

const ContentContainer = () => {
  return (
    <div className="main__content">
      <BurgerToggle />
      <Content />
    </div>
  )
}

export default ContentContainer
