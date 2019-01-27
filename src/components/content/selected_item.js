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
    this.setState({
      edit: true,
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

    this.setState({
      edit: false,
      errors: {}
    })
  }

  componentDidMount = () => {
    const { fullname, phone, email, company, photoUrl } = this.props.contactInfo

    this.setState({
      fullname,
      phone,
      email,
      company,
      photoUrl
    })
  }

  componentDidUpdate(prevProps) {
    const { fullname, phone, email, company, photoUrl } = this.props.contactInfo

    if (prevProps.contactInfo !== this.props.contactInfo) {
      this.setState({
        fullname,
        phone,
        email,
        company,
        photoUrl,
        edit: false
      })
    }
  }

  render() {
    const { open, edit, fullname, phone, email, company, image, progress, photoUrl, errors } = this.state
    const { contactId } = this.props

    return (
      <React.Fragment>
        <Item.Group relaxed>
          <Item>
            <div className="image__container">
              <Item.Image
                src={photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
                size='small'
                rounded
              />
              {edit ?
                <React.Fragment>
                  <input
                    className="file-input"
                    type='file'
                    accept='image/*'
                    onChange={this.handleImageChange}
                  />
                  <Button onClick={uploadPhoto.bind(this, image, progress)} color='orange'>
                    <Icon name='upload' /> upload
                </Button>
                </React.Fragment>
                :
                null
              }
            </div>
            <Item.Content>
              <form onSubmit={(e) => this.handleUpdateContact(e)}>
                <Item.Extra>
                  <input
                    className="item__input"
                    name='fullname'
                    value={fullname}
                    onChange={changeStateValue.bind(this)}
                    disabled={edit ? false : true}
                  />
                  {errors.fullname ? <div className="input-errors">{errors.fullname}</div> : null}
                </Item.Extra>
                <Item.Extra>
                  <input
                    className="item__input"
                    name='phone'
                    value={phone}
                    onChange={changeStateValue.bind(this)}
                    disabled={edit ? false : true}
                  />
                  {errors.phone ? <div className="input-errors">{errors.phone}</div> : null}
                </Item.Extra>
                <Divider />
                <Item.Extra>
                  <input
                    className="item__input"
                    type='email'
                    name='email'
                    value={email}
                    onChange={changeStateValue.bind(this)}
                    disabled={edit ? false : true}
                  />
                  {errors.email ? <div className="input-errors">{errors.email}</div> : null}
                </Item.Extra>
                <Item.Extra>
                  <input
                    className="item__input"
                    name='company'
                    value={company}
                    onChange={changeStateValue.bind(this)}
                    disabled={edit ? false : true}
                  />
                  {errors.company ? <div className="input-errors">{errors.company}</div> : null}
                </Item.Extra>
                {edit ?
                  <React.Fragment>
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
                      onClick={() => this.setState({ edit: false, errors: {} })}
                    />
                  </React.Fragment>
                  :
                  null
                }
              </form>
            </Item.Content>
          </Item>
        </Item.Group>
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
  contacts: store.contacts.contactList,
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
