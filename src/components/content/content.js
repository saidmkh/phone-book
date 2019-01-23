import React, { Component } from 'react'
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

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit_modal: false,
      delete_modal: false
    }
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { edit_modal, delete_modal } = this.state

    return (
      <div className="main__content">
        <Item.Group relaxed>
          <Item>
            <Item.Image
              src='https://react.semantic-ui.com/images/wireframe/image.png'
              size='small'
              rounded
            />
            <Item.Content>
              <Item.Header>Content A</Item.Header>
              <Item.Extra>
                <Icon color='green' name='phone' /> 888-888-888
              </Item.Extra>
              <Divider />
              <Item.Extra>
                <Icon color='green' name='mail' /> dsadsa@gfdsa.com
              </Item.Extra>
              <Item.Extra>
                <Icon color='green' name='briefcase' /> Jobj
              </Item.Extra>
              <Item.Extra>
                <Button
                  floated='right'
                  icon='delete'
                  color='red'
                  name='delete_modal'
                  onClick={this.open}
                />
                <Confirm
                  size='mini'
                  open={delete_modal}
                  onCancel={this.close}
                  onConfirm={this.close}
                />
                <Modal
                  size='small'
                  name='edit_modal'
                  open={edit_modal}
                  onOpen={this.open}
                  onClose={this.close}
                  trigger={
                    <Button
                      color='yellow'
                      icon='edit'
                      floated='right'
                    />}
                  closeIcon
                >
                  <Header content='Update contact' />
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
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

export default Content
