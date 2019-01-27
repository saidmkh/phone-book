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
import { changeStateValue, uploadPhoto } from '../../_helpers/functions'
import inputValidate from '../../_helpers/input_validate'

class SelectedItem extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      fullname: '',
      phone: '',
      email: '',
      company: '',
      photoUrl: '',
      image: null,
      progress: 0,
      open: false,
      edit: false
    }

    this.state = { ...this.initialState }
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  resetState = () => {
    this.setState({ ...this.initialState })
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  editClick = () => {
    const { fullname, phone, email, company, photoUrl } = this.props.contact

    this.setState({
      edit: true,
      fullname,
      phone,
      email,
      company,
      photoUrl
    })
  }

  handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState({ image })
    }
  }

  removeContact = (contactId) => {
    this.props.deleteContact(contactId)
    this.props.selectContact(null)
    this.setState({ open: false })
  }

  handleUpdateContact = (contactId, e) => {
    e.preventDefault()

    const { fullname, phone, email, company, photoUrl } = this.state
    const { updateContact } = this.props
    const Contact = {
      fullname,
      phone,
      email,
      company,
      photoUrl
    }
    const { errors, validate } = inputValidate(Contact)

    if (!validate) {
      this.setState({
        errors: errors
      })

      return false
    }

    updateContact(Contact, contactId)
    this.resetState()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.contact !== prevProps.contact) {
      this.resetState()
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.contact !== this.state.contact;
  }

  render() {
    const { open, edit, fullname, phone, email, company, image, progress, photoUrl } = this.state
    const { contact, contactId } = this.props

    console.log('render Item')
    return (
      <React.Fragment>
        {edit ?
          <Item.Group relaxed>
            <Item>
              <div className="image__container">
                <Item.Image
                  src={photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
                  size='small'
                  rounded
                />
                <input
                  className="file-input"
                  type='file'
                  accept='image/*'
                  onChange={this.handleImageChange}
                />
                <Button onClick={uploadPhoto.bind(this, image, progress)} color='orange'>
                  <Icon name='upload' /> upload
                </Button>
              </div>
              <Item.Content>
                <form onSubmit={(e) => this.handleUpdateContact(contactId, e)}>
                  <Item.Extra>
                    <Input
                      name='fullname'
                      value={fullname}
                      onChange={changeStateValue.bind(this)}
                      size='big'
                    />
                  </Item.Extra>
                  <Item.Extra>
                    <Input
                      name='phone'
                      iconPosition='left'
                      icon='phone'
                      value={phone}
                      onChange={changeStateValue.bind(this)}
                    />
                  </Item.Extra>
                  <Divider />
                  <Item.Extra>
                    <Input
                      type='email'
                      name='email'
                      iconPosition='left'
                      icon='mail'
                      value={email}
                      onChange={changeStateValue.bind(this)}
                    />
                  </Item.Extra>
                  <Item.Extra>
                    <Input
                      name='company'
                      iconPosition='left'
                      icon='briefcase'
                      value={company}
                      onChange={changeStateValue.bind(this)}
                    />
                  </Item.Extra>
                  <Item.Extra>
                    <Button
                      type='submit'
                      color='green'
                      title='Save'
                      icon='save'
                      floated='right'
                    />
                    <Button
                      color='orange'
                      title='Cancel'
                      icon='delete'
                      floated='right'
                      onClick={() => this.setState({ edit: false })}
                    />
                  </Item.Extra>
                </form>
              </Item.Content>
            </Item>
          </Item.Group>
          :
          <Item.Group relaxed>
            <Item>
              <Item.Image
                src={contact.photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
                size='small'
                rounded
              />
              <Item.Content>
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
              </Item.Content>
            </Item>
          </Item.Group>
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
      </React.Fragment>
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
