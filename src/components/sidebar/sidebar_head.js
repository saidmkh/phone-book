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
  Divider,
  Form
} from 'semantic-ui-react'

import SearchBlock from './search_block'
import { changeStateValue } from '../../_helpers/functions'
import { phoneBookStorage } from '../../config/firebase'
import { addContact } from '../../action/contacts'
import inputValidate from '../../_helpers/input_validate'

class SidebarHead extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      fullname: '',
      phone: '',
      email: '',
      company: '',
      photoUrl: '',
      image: null,
      open: false,
      progress: 0,
      errors: {}
    }

    this.state = { ...this.initialState }

    this.handleImageChange = this.handleImageChange.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.saveContact = this.saveContact.bind(this)
  }

  resetState = () => {
    this.setState({ ...this.initialState })
  }

  open = () => this.setState({ open: true })

  close = () => this.resetState()

  handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState({ image: image })
    }
  }

  uploadPhoto = () => {
    const { image } = this.state
    console.log(image)
    const uploadImage = phoneBookStorage.ref(`images/${image.name}`).put(image);
    uploadImage.on('state_changed',
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      err => {
        console.log(err)
      },
      () => {
        phoneBookStorage.ref('images').child(image.name).getDownloadURL()
          .then(url => {
            this.setState({
              photoUrl: url
            })
          })
      }
    )
  }

  saveContact = (e) => {
    console.log('save con')
    e.preventDefault()

    const { fullname, phone, email, company, photoUrl } = this.state
    const { addContact } = this.props

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

    addContact(Contact)

    this.resetState()
  }

  render() {
    const { fullname, phone, email, company, photoUrl, open, progress, errors } = this.state

    return (
      <div className="sidebar__head">

        <SearchBlock />

        <Modal
          size='tiny'
          open={open}
          onOpen={this.open}
          onClose={this.close}
          trigger={<Button title='Add contact' icon='add' />}
          closeIcon
        >
          <Header content='Create new contact' />
          <Modal.Content>
            <Form onSubmit={this.saveContact}>
              <div className="image__container">
                <Image
                  centered
                  src={photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
                  size='small'
                  rounded
                />
                <progress className={`${progress === 0 ? 'progress-hidden' : null} progress-bar`} value={progress} max="100" />
                <input
                  className="file-input"
                  type='file'
                  accept='image/*'
                  onChange={this.handleImageChange}
                />
                <Button onClick={this.uploadPhoto} color='orange'>
                  <Icon name='upload' /> upload
              </Button>
                {errors.photoUrl ? <div className="input-errors">{errors.photoUrl}</div> : null}
              </div>
              <Divider />
              <Grid padded>
                <Grid.Row>
                  <input
                    icon='user'
                    placeholder='Fullname'
                    name='fullname'
                    value={fullname}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                  {errors.fullname ? <div className="input-errors">{errors.fullname}</div> : null}
                </Grid.Row>
                <Grid.Row>
                  <input
                    type='text'
                    icon='phone'
                    placeholder='Phone number'
                    name='phone'
                    value={phone}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                  {errors.phone ? <div className="input-errors">{errors.phone}</div> : null}
                </Grid.Row>
                <Grid.Row>
                  <input
                    type='email'
                    icon='mail'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                  {errors.email ? <div className="input-errors">{errors.email}</div> : null}
                </Grid.Row>
                <Grid.Row>
                  <input
                    icon='briefcase'
                    iconPosition='left'
                    placeholder='Company'
                    name='company'
                    value={company}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                  {errors.company ? <div className="input-errors">{errors.company}</div> : null}
                </Grid.Row>
              </Grid>
              <Modal.Actions>
                <Button color='red' onClick={this.close}>
                  <Icon name='remove' /> Close
                </Button>
                <Button
                  type='submit'
                  color='green'
                >
                  <Icon name='checkmark' /> Save
                </Button>
              </Modal.Actions>
            </Form>
          </Modal.Content>
        </Modal>
      </div >
    )
  }
}

export default connect(null, { addContact })(SidebarHead)
