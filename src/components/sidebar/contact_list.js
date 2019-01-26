import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

import ContactItem from './contact_item'
import { getContacts } from '../../action/contacts'


class ContactList extends Component {
  componentDidMount() {
    this.props.getContacts()
  }

  render() {
    const { contacts } = this.props

    return (
      <div className="contact__list">
        <List selection>
          {contacts.map((obj, idx) => {
            return (
              <ContactItem
                key={idx}
                obj={obj}
              />
            )
          })}
        </List>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  contacts: store.contacts.contactList
})

export default connect(mapStateToProps, { getContacts })(ContactList)