import React from 'react'

const mainSideToggle = () => {
  const content = document.getElementsByClassName('main__content')[0]
  content.classList.toggle('toggle-content')
}


const BurgerToggle = () => {
  return (
    <div className="burger-menu" onClick={mainSideToggle}>
      <div className="burger-menu-container">
        <div className="burger-menu--line"></div>
        <div className="burger-menu--line"></div>
        <div className="burger-menu--line"></div>
      </div>
    </div>
  )
}

export default BurgerToggle
