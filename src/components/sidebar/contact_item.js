import React from 'react'
import { Image, List } from 'semantic-ui-react'

const ContactItem = (props) => {
  return (
    <List.Item>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
      <List.Content>
        <List.Header>Snickerdoodle</List.Header>
        An excellent companion
        </List.Content>
    </List.Item>
  )
}

export default ContactItem
