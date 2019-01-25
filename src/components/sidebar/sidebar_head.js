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
import { phoneBookStorage, contactsRef } from '../../config/firebase'
import { addContact } from '../../action/contacts'

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
      open: false
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
      const { image } = this.props
      this.setState(() => ({ image }))
    }
  }

  uploadPhoto = () => {
    const { image } = this.state
    console.log(phoneBookStorage.ref())
    console.log(contactsRef)
    const uploadTask = phoneBookStorage.ref(`images/${image.name}`)
      .put(image);
    uploadTask.on('state_changed',
      snapshot => {
        console.log(snapshot)
      },
      err => {
        console.log(err)
      },
      () => {
        phoneBookStorage.ref('images').child(image.name).getDownloadURL()
          .then(url => {
            console.log(url)
            this.setState({
              photoUrl: url
            })
          })
      }
    )
  }

  saveContact = (e) => {
    e.preventDefault()

    const { fullname, phone, email, company, photoUrl, open } = this.state
    const { addContact } = this.props

    const Contact = {
      fullname,
      phone,
      email,
      company,
      photoUrl
    }

    addContact(Contact)

    this.resetState()
  }

  render() {
    const { fullname, phone, email, company, photoUrl, open } = this.state

    return (
      <div className="sidebar__head">

        <SearchBlock />

        <Modal
          size='small'
          open={open}
          onOpen={this.open}
          onClose={this.close}
          trigger={<Button title='Add contact' icon='add' />}
          closeIcon
        >
          <Header content='Create new contact' />
          <Modal.Content>
            <Form onSubmit={this.saveContact}>
              <Image
                centered
                src={photoUrl || 'https://react.semantic-ui.com/images/wireframe/image.png'}
                size='small'
                rounded
              />
              <input
                type="file"
                onChange={this.handleImageChange}
              />
              <Button onClick={this.uploadPhoto} color='orange'>
                <Icon name='upload' /> upload
              </Button>
              <Divider />
              <Grid padded>
                <Grid.Row stretched>
                  <Input
                    icon='user'
                    iconPosition='left'
                    placeholder='Fullname'
                    name='fullname'
                    value={fullname}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                </Grid.Row>
                <Grid.Row>
                  <Input
                    icon='phone'
                    iconPosition='left'
                    placeholder='Phone number'
                    name='phone'
                    value={phone}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                </Grid.Row>
                <Grid.Row>
                  <Input
                    icon='mail'
                    iconPosition='left'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
                </Grid.Row>
                <Grid.Row>
                  <Input
                    icon='briefcase'
                    iconPosition='left'
                    placeholder='Company'
                    name='company'
                    value={company}
                    onChange={changeStateValue.bind(this)}
                    required
                  />
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
