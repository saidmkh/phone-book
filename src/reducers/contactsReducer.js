import { GET_CONTACTS, SELECT_CONTACT } from '../action/types'

const initialState = {
  contactList: [],
  selectedContact: null,
  foundContacts: []
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contactList: action.payload
      }
    case SELECT_CONTACT:
      console.log(action)
      return {
        ...state,
        selectedContact: action.payload
      }
    default:
      return state
  }
}

export default contactReducer