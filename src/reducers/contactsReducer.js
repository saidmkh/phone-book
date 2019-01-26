import { GET_CONTACTS, SELECT_CONTACT, SEARCH_CONTACTS } from '../action/types'

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
      return {
        ...state,
        selectedContact: action.payload
      }
    case SEARCH_CONTACTS:
      return {
        ...state,
        foundContacts: action.payload
      }
    default:
      return state
  }
}

export default contactReducer