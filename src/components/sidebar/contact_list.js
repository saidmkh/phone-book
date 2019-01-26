import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

import ContactItem from './contact_item'
import { getContacts } from '../../action/contacts'


class ContactList extends Component {
  state = {
    contacts: this.props.contacts
  }

  componentDidMount() {
    this.props.getContacts()
    this.setState({
      contacts: this.props.contacts
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contacts: nextProps.foundContacts
    })
  }

  render() {
    const { contacts } = this.state

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
  contacts: store.contacts.contactList,
  foundContacts: store.contacts.foundContacts
})

export default connect(mapStateToProps, { getContacts })(ContactList)