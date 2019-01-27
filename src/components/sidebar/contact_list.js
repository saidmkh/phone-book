import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Loader } from 'semantic-ui-react'

import ContactItem from './contact_item'
import { getContacts } from '../../action/contacts'


class ContactList extends Component {
  state = {
    contacts: [],
    loader: true
  }

  componentDidMount() {
    this.props.getContacts()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contacts: nextProps.foundContacts
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.contacts !== prevProps.contacts) {
      this.setState({
        contacts: this.props.contacts,
        loader: false
      })
    }
  }


  render() {
    const { contacts, loader } = this.state

    return (
      <div className="contact__list">
        {loader ?
          <Loader active inline='centered' />
          :
          <List selection>
            {contacts.map((obj, idx) => {
              return (
                <ContactItem
                  key={idx}
                  obj={obj}
                />
              )
            })}
          </List>
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  contacts: store.contacts.contactList,
  foundContacts: store.contacts.foundContacts
})

export default connect(mapStateToProps, { getContacts })(ContactList)