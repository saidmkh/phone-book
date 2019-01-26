import { contactsRef } from '../config/firebase'
import { GET_CONTACTS, SELECT_CONTACT } from './types'

export const getContacts = () => dispatch => {
  contactsRef.on('value', snapshot => {
    dispatch({
      type: GET_CONTACTS,
      payload: snapshot.val() ? Object.entries(snapshot.val()) : []
    })
  })
}

export const addContact = contact => dispatch => {
  contactsRef.push().set(contact)
}

export const deleteContact = contactId => dispatch => {
  contactsRef.child(contactId).remove()
}

export const selectContact = contact => dispatch => {
  dispatch({
    type: SELECT_CONTACT,
    payload: contact
  })
}