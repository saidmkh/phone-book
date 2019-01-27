import React, { Component } from 'react'
import { connect } from 'react-redux'

import SelectedItem from './selected_item'

class Content extends Component {
  render() {
    const { contact } = this.props

    if (contact) {
      return (
        <div className="main__content--item">
          <SelectedItem />
        </div>
      )
    } else {
      return (
        <div className="detail-placeholder">
          Select a contact
        </div>
      )
    }
  }
}

const mapStateToProps = store => ({
  contact: store.contacts.selectedContact
})

export default connect(mapStateToProps)(Content)
