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

import { deleteContact, selectContact, updateContact } from '../../action/contacts'
import { changeStateValue } from '../../_helpers/functions'

class SelectedItem extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      fullname: '',
      phone: '',
      email: '',
      company: '',
      open: false,
      edit: false
    }

    this.state = { ...this.initialState }
  }

  resetState = () => {
    this.setState({ ...this.initialState })
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  editClick = () => {
    this.setState({
      edit: true,
      fullname: this.props.contact.fullname,
      phone: this.props.contact.phone,
      email: this.props.contact.email,
      company: this.props.contact.company
    })
  }

  removeContact = (contactId) => {
    this.props.deleteContact(contactId)
    this.props.selectContact(null)
    this.setState({ open: false })
  }

  updateContact = (contactId) => {
    const Contact = {
      fullname: this.state.fullname,
      phone: this.state.phone,
      email: this.state.email,
      company: this.state.company
    }

    //this.props.updateContact(Contact, contactId)
  }

  componentWillUnmount() {
    this.resetState()
  }

  render() {
    console.log('state', this.state)
    const { open, edit, fullname, phone, email, company } = this.state
    const { contact, contactId } = this.props

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
                <Input
                  value={fullname}
                  onChange={changeStateValue.bind(this)}
                  size='big'
                />
                <Item.Extra>
                  <Input
                    iconPosition='left'
                    icon='phone'
                    value={phone}
                    onChange={changeStateValue.bind(this)}
                  />
                </Item.Extra>
                <Divider />
                <Item.Extra>
                  <Input
                    iconPosition='left'
                    icon='mail'
                    value={email}
                    onChange={changeStateValue.bind(this)}
                  />
                </Item.Extra>
                <Item.Extra>
                  <Input
                    iconPosition='left'
                    icon='briefcase'
                    value={company}
                    onChange={changeStateValue.bind(this)}
                  />
                </Item.Extra>
                <Item.Extra>
                  <Button
                    color='green'
                    title='Save'
                    icon='save'
                    floated='right'
                    onClick={this.updateContact(contactId)}
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
                onClick={this.editClick}
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
    selectContact,
    updateContact
  })
  (SelectedItem)
