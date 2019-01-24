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
      open: false,
      edit: false
    }
  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open, edit } = this.state

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
              {edit ?
                <React.Fragment>
                  <Input value='Hello Helloev' size='big' />
                  <Item.Extra>
                    <Input iconPosition='left' icon='phone' value='888-888-999' />
                  </Item.Extra>
                  <Divider />
                  <Item.Extra>
                    <Input iconPosition='left' icon='mail' value='dada@gdad.com' />
                  </Item.Extra>
                  <Item.Extra>
                    <Input iconPosition='left' icon='briefcase' value='Jobj' />
                  </Item.Extra>

                  <Item.Extra>
                    <Button
                      color='green'
                      title='Save'
                      icon='save'
                      floated='right'
                      onClick={() => this.setState({ edit: false })}
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
                  <Item.Header>Хало Халовев</Item.Header>
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
                  onConfirm={this.close}
                />
                <Button
                  color='yellow'
                  title='Edit'
                  icon='edit'
                  floated='right'
                  onClick={() => this.setState({ edit: true })}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

export default Content
