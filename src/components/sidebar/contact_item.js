import React from 'react'
import { connect } from 'react-redux'
import { Image, List } from 'semantic-ui-react'

import { selectContact } from '../../action/contacts'

const ContactItem = (props) => {
  const contact = props.obj[1]

  return (
    <List.Item onClick={() => props.selectContact(props.obj)}>
      <Image avatar src={contact.photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'} />
      <List.Content>
        <List.Header>{contact.fullname}</List.Header>
        {contact.phone}
      </List.Content>
    </List.Item>
  )
}

export default connect(null, { selectContact })(ContactItem)
