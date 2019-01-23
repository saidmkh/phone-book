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

class SidebarHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

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
              src={this.state.url || 'https://react.semantic-ui.com/images/wireframe/image.png'}
              size='small'
              rounded
            />
            <input
              type="file"
              onChange={this.handleChange}
            />
            <Button color='orange'>
              <Icon name='upload' /> upload
              </Button>
            <Divider />
            <Grid padded>
              <Grid.Row stretched>
                <Input
                  icon='user'
                  iconPosition='left'
                  placeholder='Fullname'
                />
              </Grid.Row>
              <Grid.Row>
                <Input
                  icon='phone'
                  iconPosition='left'
                  placeholder='Phone number'
                />
              </Grid.Row>
              <Grid.Row>
                <Input
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                />
              </Grid.Row>
              <Grid.Row>
                <Input
                  icon='briefcase'
                  iconPosition='left'
                  placeholder='Company'
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
