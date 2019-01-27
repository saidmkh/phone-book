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
      edit: false,
      errors: {}
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
    const { fullname, phone, email, company, photoUrl } = this.props.contactInfo

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

  removeContact = () => {
    const { deleteContact, selectContact, contactId } = this.props

    deleteContact(contactId)
    selectContact(null)
    this.setState({ open: false })
  }

  handleUpdateContact = (e) => {
    e.preventDefault()

    const { fullname, phone, email, company, photoUrl } = this.state
    const { updateContact, contactId } = this.props
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
    const { open, edit, fullname, phone, email, company, image, progress, photoUrl, errors } = this.state
    const { contactInfo, contactId } = this.props

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
                <form onSubmit={(e) => this.handleUpdateContact(e)}>
                  <Item.Extra>
                    <Input
                      name='fullname'
                      iconPosition='left'
                      icon='user'
                      value={fullname}
                      onChange={changeStateValue.bind(this)}
                    />
                    {errors.fullname ? <div className="input-errors">{errors.fullname}</div> : null}
                  </Item.Extra>
                  <Item.Extra>
                    <Input
                      name='phone'
                      iconPosition='left'
                      icon='phone'
                      value={phone}
                      onChange={changeStateValue.bind(this)}
                    />
                    {errors.phone ? <div className="input-errors">{errors.phone}</div> : null}
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
                    {errors.email ? <div className="input-errors">{errors.email}</div> : null}
                  </Item.Extra>
                  <Item.Extra>
                    <Input
                      name='company'
                      iconPosition='left'
                      icon='briefcase'
                      value={company}
                      onChange={changeStateValue.bind(this)}
                    />
                    {errors.company ? <div className="input-errors">{errors.company}</div> : null}
                  </Item.Extra>
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
                </form>
              </Item.Content>
            </Item>
          </Item.Group>
          :
          <Item.Group relaxed>
            <Item>
              <Item.Image
                src={contactInfo.photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
                size='small'
                rounded
              />
              <Item.Content>
                <Item.Header>{contactInfo.fullname}</Item.Header>
                <Item.Extra>
                  <Icon color='green' name='phone' />{contactInfo.phone}
                </Item.Extra>
                <Divider />
                <Item.Extra>
                  <Icon color='green' name='mail' />{contactInfo.email}
                </Item.Extra>
                <Item.Extra>
                  <Icon color='green' name='briefcase' />{contactInfo.company}
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
  contact: store.contacts.selectedContact,
  contactInfo: store.contacts.selectedContact[1],
  contactId: store.contacts.selectedContact[0]
})

export default connect(mapStateToProps,
  {
    deleteContact,
    selectContact,
    updateContact
  })
  (SelectedItem)
