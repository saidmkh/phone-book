import React, { Component } from 'react'
import {
  Grid,
  Button,
  Image,
  Header,
  Icon,
  Input,
  Modal,
  Divider
} from 'semantic-ui-react'

import SearchBlock from './search_block'
import { changeStateValue } from '../../_helpers/functions'
import { storage } from '../../config/firebase'
import { databaseRef } from '../../firebase/firebase_refs'

class SidebarHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      phone: '',
      email: '',
      company: '',
      photoUrl: '',
      image: null,
      open: false
    }

    this.handleImageChange = this.handleImageChange.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  handleImageChange = (e) => {
    if (e.target.files[0]) {
      const { image } = this.props
      this.setState(() => ({ image }))
    }
  }

  uploadPhoto = () => {
    const { image } = this.state
    console.log(storage)
    console.log(databaseRef)
    const uploadTask = storage.ref(`images/${image.name}`)
      .put(image);
    uploadTask.on('state_changed',
      snapshot => {
        console.log(snapshot)
      },
      err => {
        console.log(err)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL()
          .then(url => {
            console.log(url)
            this.setState({
              photoUrl: url
            })
          })
      }
    )
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
                />
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.close}>
              <Icon name='remove' /> Close
            </Button>
            <Button color='green' onClick={this.close}>
              <Icon name='checkmark' /> Save
            </Button>
          </Modal.Actions>
        </Modal>
      </div >
    )
  }
}

export default SidebarHead
