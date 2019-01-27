import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'

import { searchContacts } from '../../action/contacts'

class SearchBlock extends Component {
  searchContacts = e => {
    const { contacts, searchContacts } = this.props
    let value = e.target.value.toLowerCase()

    let foundContacts = contacts.filter(item => {
      if (value === '') {
        return true
      } else {
        let fullnameValue = item[1].fullname.toLowerCase().indexOf(value) !== -1
        let phoneValue = item[1].phone.toLowerCase().indexOf(value) !== -1
        let emailValue = item[1].email.toLowerCase().indexOf(value) !== -1
        let companyValue = item[1].company.toLowerCase().indexOf(value) !== -1

        return fullnameValue || phoneValue || emailValue || companyValue
      }
    })

    searchContacts(foundContacts)
  }

  render() {
    return (
      <div className="search_block">
        <Input
          fluid
          icon='search'
          placeholder='Search contact'
          onChange={this.searchContacts.bind(this)}
        />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  contacts: store.contacts.contactList
})

export default connect(mapStateToProps, { searchContacts })(SearchBlock)


