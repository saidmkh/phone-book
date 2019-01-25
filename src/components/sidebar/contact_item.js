import React from 'react'
import { Image, List } from 'semantic-ui-react'

const ContactItem = (props) => {
  return (
    <List.Item>
      <Image avatar src={props.obj.photoUrl} />
      <List.Content>
        <List.Header>{props.obj.fullname}</List.Header>
        {props.obj.phone}
      </List.Content>
    </List.Item>
  )
}

export default ContactItem
