import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Button,
  Image,
  Header,
  Icon,
  Modal,
  Divider,
  Form,
  Progress
} from 'semantic-ui-react'

import SearchBlock from './search_block'
import { changeStateValue, uploadPhoto } from '../../_helpers/functions'
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
      this.setState({ image })
    }
  }

  saveContact = (e) => {
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
    const { fullname, phone, email, company, photoUrl, open, progress, errors, image } = this.state

    return (
      <div className="sidebar__head">

        <SearchBlock />

        <Modal
          size='tiny'
          open={open}
          onOpen={this.open}
          onClose={this.close}
          trigger={<Button title='Add contact' icon='user plus' />}
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
                <Progress
                  size='tiny'
                  className={`${progress === 0 ? 'progress-hidden' : null} progress-bar`}
                  percent={progress}
                  success
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
                    maxLength='60'
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
                    maxLength='13'
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
                    placeholder='Company'
                    name='company'
                    value={company}
                    onChange={changeStateValue.bind(this)}
                    maxLength='60'
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
