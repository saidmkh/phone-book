import React, { Component } from 'react'
import { Image, List } from 'semantic-ui-react'

import ContactItem from './contact_item'

class ContactList extends Component {
  render() {
    return (
      <div className="contact__list">
        <List selection>
          <ContactItem />
        </List>
      </div>
    )
  }
}

export default ContactList