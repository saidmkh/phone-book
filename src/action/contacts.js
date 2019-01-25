import { contactsRef } from '../config/firebase'
import { GET_CONTACTS } from './types'

export const getContacts = () => dispatch => {
  contactsRef.on('value', snapshot => {
    dispatch({
      type: GET_CONTACTS,
      payload: snapshot.val()
    })
  })
}

export const addContact = contact => dispatch => {
  contactsRef.push().set(contact)
}

export const deleteContact = contact => dispatch => {
  contactsRef.child(contact).remove()
} 