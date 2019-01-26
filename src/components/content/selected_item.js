import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Button,
  Image,
  Header,
  Icon,
  Input,
  Modal,
  Item,
  Divider,
  Confirm
} from 'semantic-ui-react'

import { deleteContact, selectContact } from '../../action/contacts'

class SelectedItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      edit: false
    }
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  removeContact = (contactId) => {
    this.props.deleteContact(contactId)
    this.props.selectContact(null)
    this.setState({ open: false })
  }

  render() {
    const { open, edit } = this.state
    const { contact, contactId } = this.props

    console.log(this.props)
    return (
      <Item.Group relaxed>
        <Item>
          <Item.Image
            src={contact.photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
            size='small'
            rounded
          />
          <Item.Content>
            {edit ?
              <React.Fragment>
                <Input value={contact.fullname} size='big' />
                <Item.Extra>
                  <Input iconPosition='left' icon='phone' value={contact.phone} />
                </Item.Extra>
                <Divider />
                <Item.Extra>
                  <Input iconPosition='left' icon='mail' value={contact.email} />
                </Item.Extra>
                <Item.Extra>
                  <Input iconPosition='left' icon='briefcase' value={contact.company} />
                </Item.Extra>

                <Item.Extra>
                  <Button
                    color='green'
                    title='Save'
                    icon='save'
                    floated='right'
                    onClick={() => this.setState({ edit: false })}
                  />
                  <Button
                    color='orange'
                    title='Cancel'
                    icon='delete'
                    floated='right'
                    onClick={() => this.setState({ edit: false })}
                  />
                </Item.Extra>
              </React.Fragment>
              :
              <React.Fragment>
                <Item.Header>{contact.fullname}</Item.Header>
                <Item.Extra>
                  <Icon color='green' name='phone' />{contact.phone}
                </Item.Extra>
                <Divider />
                <Item.Extra>
                  <Icon color='green' name='mail' />{contact.email}
                </Item.Extra>
                <Item.Extra>
                  <Icon color='green' name='briefcase' />{contact.company}
                </Item.Extra>
              </React.Fragment>
            }
            <Item.Extra>
              <Button
                floated='right'
                icon='trash alternate outline'
                color='red'
                title='Delete'
                onClick={this.open}
              />
              <Confirm
                size='mini'
                open={open}
                onCancel={this.close}
                onConfirm={() => this.removeContact(contactId)}
              />
              <Button
                color='yellow'
                title='Edit'
                icon='edit'
                floated='right'
                onClick={() => this.setState({ edit: true })}
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

const mapStateToProps = store => ({
  contact: store.contacts.selectedContact[1],
  contactId: store.contacts.selectedContact[0]
})

export default connect(mapStateToProps,
  {
    deleteContact,
    selectContact
  })
  (SelectedItem)
